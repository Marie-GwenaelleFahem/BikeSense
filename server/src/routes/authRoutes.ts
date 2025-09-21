import { Router, Request, Response } from "express";
import { findUserByEmail, findUserById, verifyUserPassword, createUser, updateUser } from "../models/userModel";
import { authMiddleware, generateToken } from "../middleware/auth";

const router = Router();

// POST /auth/register - Inscription
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    // Validation basique
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe requis"
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Un utilisateur avec cet email existe déjà"
      });
    }

    // Créer l'utilisateur
    const user = await createUser({
      email,
      password,
      firstname,
      lastname
    });

    // Générer le token
    const token = generateToken(user.id);

    // Définir le cookie HTTP
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS en production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });

    // Retourner les infos utilisateur (sans le mot de passe)
    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
});

// POST /auth/login - Connexion
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation basique
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe requis"
      });
    }

    // Trouver l'utilisateur
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect"
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await verifyUserPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect"
      });
    }

    // Générer le token
    const token = generateToken(user.id);

    // Définir le cookie HTTP
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });

    // Retourner les infos utilisateur
    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
});

// POST /auth/logout - Déconnexion
router.post("/logout", (req: Request, res: Response) => {
  // Supprimer le cookie
  res.clearCookie('token');
  
  res.json({
    success: true,
    message: "Déconnexion réussie"
  });
});

// GET /me - Récupérer les infos utilisateur (protégé)
router.get("/me", authMiddleware, (req: Request, res: Response) => {
  // L'utilisateur est déjà attaché à req.user par le middleware
  res.json({
    success: true,
    data: req.user
  });
});

// PUT /auth/change-password - Changer le mot de passe (protégé)
router.put("/change-password", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user!.id;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Mot de passe actuel et nouveau mot de passe requis"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Le nouveau mot de passe doit contenir au moins 6 caractères"
      });
    }

    // Récupérer l'utilisateur actuel
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    // Vérifier le mot de passe actuel
    const isCurrentPasswordValid = await verifyUserPassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Mot de passe actuel incorrect"
      });
    }

    // Mettre à jour le mot de passe
    await updateUser(userId, { password: newPassword });

    res.json({
      success: true,
      message: "Mot de passe modifié avec succès"
    });

  } catch (error: any) {
    console.error("Erreur lors du changement de mot de passe:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
});

// PUT /auth/profile - Mettre à jour son propre profil
router.put("/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const userId = req.user!.id;

    // Préparer les données de mise à jour
    const updateData: any = {};
    if (firstname !== undefined) updateData.firstname = firstname;
    if (lastname !== undefined) updateData.lastname = lastname;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    // Vérifier que l'email n'est pas déjà utilisé par un autre utilisateur
    if (email) {
      const existingUser = await findUserByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({
          success: false,
          message: "Cet email est déjà utilisé par un autre utilisateur"
        });
      }
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await updateUser(userId, updateData);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    // Retourner l'utilisateur mis à jour (sans le mot de passe)
    res.json({
      success: true,
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        role: updatedUser.role
      },
      message: "Profil mis à jour avec succès"
    });
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur interne du serveur"
    });
  }
});

export default router;
