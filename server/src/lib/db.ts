import mariadb from "mariadb";

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3307"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mariadb.createPool(dbConfig);

// Fonction pour tester la connexion
export const testConnection = async (): Promise<boolean> => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Connexion à la base de données réussie");
    return true;
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
    return false;
  } finally {
    if (conn) conn.release();
  }
};

// Fonction pour exécuter des requêtes
export const executeQuery = async (
  query: string,
  params?: any[]
): Promise<any> => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query, params);
    return result;
  } catch (error) {
    console.error("Erreur lors de l'exécution de la requête:", error);
    throw error;
  } finally {
    if (conn) conn.release();
  }
};

export default pool;
