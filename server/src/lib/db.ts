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

// teste la connexion à al base
export const testConnection = async (): Promise<boolean> => {
  let conn;
  try {
    conn = await pool.getConnection();
    return true;
  } catch (error) {
    return false;
  } finally {
    if (conn) conn.release();
  }
};

// exécute une requête
export const executeQuery = async (
  query: string,
  params?: any[]
): Promise<any> => {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query(query, params);
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.release();
  }
};

export default pool;
