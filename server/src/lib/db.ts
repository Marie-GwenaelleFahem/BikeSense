import mariadb from "mariadb";

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mariadb.createPool(dbConfig);

// test the connection to the database
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

// execute a query - Utilise une connexion directe pour éviter les problèmes de pool avec SSH
export const executeQuery = async (
  query: string,
  params?: any[]
): Promise<any> => {
  let conn;
  try {
    // Connexion directe au lieu de la pool pour SSH
    conn = await mariadb.createConnection(dbConfig);
    return await conn.query(query, params);
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.end();
  }
};

export default pool;
