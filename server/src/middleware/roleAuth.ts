import { Request, Response, NextFunction } from "express";

// Types de rôles disponibles
export type UserRole = 'admin' | 'employee' | 'guest';

// Hiérarchie des permissions (du plus restrictif au plus permissif)
const roleHierarchy: Record<UserRole, number> = {
  'guest': 1,       // Lecture seule
  'employee': 2,    // Lecture + actions de base  
  'admin': 3        // Tous les droits
};

// Middleware pour vérifier les rôles
export const requireRole = (minRole: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Vérifier que l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentification requise"
      });
    }

    // Récupérer le rôle de l'utilisateur (avec fallback)
    const userRole = (req.user as any).role || 'user';
    
    // Vérifier les permissions
    const userLevel = roleHierarchy[userRole as UserRole] || 0;
    const requiredLevel = roleHierarchy[minRole];

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        message: `Accès refusé. Rôle ${minRole} ou supérieur requis.`,
        userRole: userRole,
        requiredRole: minRole
      });
    }

    next();
  };
};

// Middlewares spécifiques pour chaque rôle
export const requireAdmin = requireRole('admin');
export const requireEmployee = requireRole('employee');
export const requireGuest = requireRole('guest');

// Fonction utilitaire pour vérifier si un utilisateur a un rôle spécifique
export const hasRole = (userRole: UserRole, minRole: UserRole): boolean => {
  const userLevel = roleHierarchy[userRole] || 0;
  const requiredLevel = roleHierarchy[minRole];
  return userLevel >= requiredLevel;
};

// Fonction pour obtenir les permissions d'un rôle
export const getRolePermissions = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return {
        canRead: true,
        canWrite: true,
        canDelete: true,
        canManageUsers: true,
        canAccessSettings: true,
        canViewReports: true
      };
    case 'employee':
      return {
        canRead: true,
        canWrite: true,
        canDelete: false,
        canManageUsers: false,
        canAccessSettings: false,
        canViewReports: true
      };
    case 'guest':
      return {
        canRead: true,
        canWrite: false,
        canDelete: false,
        canManageUsers: false,
        canAccessSettings: false,
        canViewReports: false
      };
    default:
      return {
        canRead: false,
        canWrite: false,
        canDelete: false,
        canManageUsers: false,
        canAccessSettings: false,
        canViewReports: false
      };
  }
};
