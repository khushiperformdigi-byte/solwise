import mysql from "mysql2/promise";
import { config } from "../config.js";

const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 8,
  queueLimit: 0,
  charset: "utf8mb4",
  dateStrings: true,
  enableKeepAlive: true,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

// Hostinger connection default is utf8mb4_general_ci; tables use utf8mb4_unicode_ci
if (pool.pool) {
  pool.pool.on("connection", (connection) => {
    connection.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
  });
}

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

export function parseJson(value, fallback) {
  if (value == null || value === "") return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export async function pingDb() {
  await query("SELECT 1 AS ok");
}

export { pool };
