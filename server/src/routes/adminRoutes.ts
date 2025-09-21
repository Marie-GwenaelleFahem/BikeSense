import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { requireAdmin, requireEmployee, getRolePermissions } from "../middleware/roleAuth";
import { getAllUsersController, getUserStatsController } from "../controllers/userController";
import { findUserById, getAllUsers, updateUser, deleteUser, createUser } from "../models/userModel";

const router = Router();

// GET /admin/users - Liste des utilisateurs (Admin seulement)
router.get("/users", authMiddleware, requireAdmin, getAllUsersController);

// POST /admin/users - Créer un utilisateur (Admin seulement)
router.post("/users", authMiddleware, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname, role } = req.body;

    // Validation basique
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe requis"
      });
    }

    // Créer l'utilisateur (sans générer de token)
    const user = await createUser({
      email,
      password,
      firstname,
      lastname,
      role: role || 'guest'
    });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      }
    });

  } catch (error: any) {
    console.error("Erreur lors de la création d'utilisateur:", error);
    
    // Gestion des erreurs spécifiques
    if (error.message && error.message.includes('Email déjà utilisé')) {
      return res.status(409).json({
        success: false,
        message: "Cet email est déjà utilisé"
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
});

// GET /admin/stats - Statistiques système (Employee ou Admin)
router.get("/stats", authMiddleware, requireEmployee, async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    const roleCount = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      success: true,
      data: {
        totalUsers: users.length,
        roleDistribution: roleCount,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des stats:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
});

// GET /admin/permissions - Obtenir les permissions de l'utilisateur connecté
router.get("/permissions", authMiddleware, (req: Request, res: Response) => {
  try {
    const userRole = req.user?.role || 'guest';
    const permissions = getRolePermissions(userRole);

    res.json({
      success: true,
      data: {
        role: userRole,
        permissions: permissions
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des permissions:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
});

// PUT /admin/users/:id - Mettre à jour un utilisateur (Admin seulement)
router.put("/users/:id", authMiddleware, requireAdmin, async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { email, password, firstname, lastname, role } = req.body;

    // Vérifier que l'utilisateur existe
    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    // Vérifier qu'on ne supprime pas le dernier admin
    if (existingUser.role === 'admin' && role !== 'admin') {
      const allUsers = await getAllUsers();
      const adminCount = allUsers.filter((u: any) => u.role === 'admin' && u.id !== userId).length;
      if (adminCount === 0) {
        return res.status(400).json({
          success: false,
          message: "Impossible de modifier le rôle du dernier administrateur"
        });
      }
    }

    // Préparer les données de mise à jour
    const updateData: any = {};
    if (email) updateData.email = email;
    if (firstname !== undefined) updateData.firstname = firstname;
    if (lastname !== undefined) updateData.lastname = lastname;
    if (role) updateData.role = role;
    if (password) {
      updateData.password = password; // Le hashage sera fait dans updateUser()
    }

    // Mettre à jour l'utilisateur en base de données
    const updatedUser = await updateUser(userId, updateData);
    
    res.json({
      success: true,
      data: {
        id: updatedUser?.id,
        email: updatedUser?.email,
        firstname: updatedUser?.firstname,
        lastname: updatedUser?.lastname,
        role: updatedUser?.role
      }
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
});

// DELETE /admin/users/:id - Supprimer un utilisateur (Admin seulement)
router.delete("/users/:id", authMiddleware, requireAdmin, async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Vérifier que l'utilisateur existe
    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    // Empêcher la suppression du dernier admin
    if (existingUser.role === 'admin') {
      const allUsers = await getAllUsers();
      const adminCount = allUsers.filter((u: any) => u.role === 'admin' && u.id !== userId).length;
      if (adminCount === 0) {
        return res.status(400).json({
          success: false,
          message: "Impossible de supprimer le dernier administrateur"
        });
      }
    }

    // Empêcher l'auto-suppression
    if (req.user?.id === userId) {
      return res.status(400).json({
        success: false,
        message: "Vous ne pouvez pas supprimer votre propre compte"
      });
    }

    // Supprimer l'utilisateur de la base de données
    const deleted = await deleteUser(userId);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé ou déjà supprimé"
      });
    }

    res.json({
      success: true,
      message: "Utilisateur supprimé avec succès"
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
});

export default router;
