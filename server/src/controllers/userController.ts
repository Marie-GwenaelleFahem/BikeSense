import { Request, Response } from "express";
import {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  verifyUserPassword
} from "../models/userModel";

// Créer un utilisateur
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname, role } = req.body;

    // Validation basique
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe requis"
      });
    }

    const userData = {
      email,
      password,
      firstname,
      lastname,
      role: role || 'guest'
    };

    const newUser = await createUser(userData);
    
    // Retourner l'utilisateur sans le mot de passe
    res.status(201).json({
      success: true,
      data: {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        role: newUser.role
      }
    });
  } catch (error: any) {
    console.error("Erreur lors de la création d'utilisateur:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur interne du serveur"
    });
  }
};

// Obtenir tous les utilisateurs (Admin seulement)
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    
    // Retourner les utilisateurs sans les mots de passe
    const safeUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    }));

    res.json({
      success: true,
      data: safeUsers
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
};

// Obtenir les statistiques des utilisateurs
export const getUserStatsController = async (req: Request, res: Response) => {
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
        lastRegistration: users[0]?.created_at || null
      }
    });
  } catch (error) {
    console.error("Erreur lors du calcul des statistiques:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur"
    });
  }
};
