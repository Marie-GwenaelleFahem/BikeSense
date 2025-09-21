import bcrypt from "bcryptjs";
import { executeQuery } from "../lib/db";

export interface User {
  id: number;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  role: 'admin' | 'employee' | 'guest';
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  role?: 'admin' | 'employee' | 'guest';
}

// Fonctions de base de données pour les utilisateurs
export const createUser = async (userData: CreateUserData): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  const query = `
    INSERT INTO users (email, password, firstname, lastname, role, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;
  
  const result = await executeQuery(query, [
    userData.email,
    hashedPassword,
    userData.firstname || null,
    userData.lastname || null,
    userData.role || 'guest'
  ]);
  
  // Récupérer l'utilisateur créé
  const newUser = await findUserById(result.insertId);
  if (!newUser) throw new Error('Erreur lors de la création de l\'utilisateur');
  
  return newUser;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = "SELECT * FROM users WHERE email = ?";
  const result = await executeQuery(query, [email]);
  
  if (result.length === 0) return null;
  
  const user = result[0];
  return {
    id: user.id,
    email: user.email,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
};

export const findUserById = async (id: number): Promise<User | null> => {
  const query = "SELECT * FROM users WHERE id = ?";
  const result = await executeQuery(query, [id]);
  
  if (result.length === 0) return null;
  
  const user = result[0];
  return {
    id: user.id,
    email: user.email,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
};

export const getAllUsers = async (): Promise<User[]> => {
  const query = "SELECT * FROM users ORDER BY created_at DESC";
  const result = await executeQuery(query);
  
  return result.map((user: any) => ({
    id: user.id,
    email: user.email,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at
  }));
};

export const verifyUserPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const updateUser = async (id: number, updateData: Partial<CreateUserData>): Promise<User | null> => {
  // Préparer les données à mettre à jour
  const fields: string[] = [];
  const values: any[] = [];

  if (updateData.email) {
    fields.push('email = ?');
    values.push(updateData.email);
  }
  if (updateData.firstname) {
    fields.push('firstname = ?');
    values.push(updateData.firstname);
  }
  if (updateData.lastname) {
    fields.push('lastname = ?');
    values.push(updateData.lastname);
  }
  if (updateData.role) {
    fields.push('role = ?');
    values.push(updateData.role);
  }
  if (updateData.password) {
    const hashedPassword = await bcrypt.hash(updateData.password, 10);
    fields.push('password = ?');
    values.push(hashedPassword);
  }

  if (fields.length === 0) {
    throw new Error('Aucune donnée à mettre à jour');
  }

  // Ajouter updated_at et l'ID
  fields.push('updated_at = NOW()');
  values.push(id);

  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  await executeQuery(query, values);

  // Retourner l'utilisateur mis à jour
  return await findUserById(id);
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const query = 'DELETE FROM users WHERE id = ?';
  const result = await executeQuery(query, [id]);
  
  // Vérifier si une ligne a été supprimée
  return result.affectedRows > 0;
};