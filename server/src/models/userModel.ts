import { executeQuery } from "../lib/db";
import bcrypt from "bcryptjs";

export interface User {
  id: number;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}

export const userModel = {
  // Créer un nouvel utilisateur
  async create(userData: CreateUserData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const query = `
      INSERT INTO users (email, password, firstname, lastname, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    
    const result = await executeQuery(query, [
      userData.email,
      hashedPassword,
      userData.firstname || null,
      userData.lastname || null
    ]);
    
    const createdUser = await this.findById(result.insertId);
    if (!createdUser) {
      throw new Error("Failed to retrieve user after creation");
    }
    return createdUser;
  },

  // Trouver un utilisateur par email
  async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = ?";
    const users = await executeQuery(query, [email]);
    
    return users.length > 0 ? users[0] : null;
  },

  // Trouver un utilisateur par ID
  async findById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = ?";
    const users = await executeQuery(query, [id]);
    
    return users.length > 0 ? users[0] : null;
  },

  // Vérifier le mot de passe
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
};
