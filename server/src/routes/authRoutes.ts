import { Router, Request, Response } from "express";
import { userModel } from "../models/userModel";
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
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Un utilisateur avec cet email existe déjà"
      });
    }

    // Créer l'utilisateur
    const user = await userModel.create({
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
        lastname: user.lastname
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
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect"
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await userModel.verifyPassword(password, user.password);
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
        lastname: user.lastname
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
  res.json(req.user);
});

export default router;
