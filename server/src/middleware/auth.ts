import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../models/userModel";

// Étendre l'interface Request pour inclure l'utilisateur
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        firstname?: string;
        lastname?: string;
        role: 'admin' | 'employee' | 'guest';
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Récupérer le token depuis les cookies
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Token d'authentification manquant" 
      });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    
    // Récupérer l'utilisateur depuis la base de données
    const user = await findUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Utilisateur non trouvé" 
      });
    }

    // Ajouter l'utilisateur à la requête
    req.user = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role
    };

    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Token invalide" 
    });
  }
};

// Fonction utilitaire pour générer un token JWT
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};
