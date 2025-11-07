import dotenv from "dotenv";
dotenv.config();

import { neon } from "@neondatabase/serverless";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;

// Initialize Neon HTTP client
const sql = neon(connectionString);

export async function getPgVersion() {
  try {
    const result = await sql`SELECT version()`;
    console.log("✅ Database version:", result[0]);
    return result[0];
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}
