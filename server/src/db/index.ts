import dotenv from "dotenv";
dotenv.config();

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function getPgVersion() {
  try {
    const result = await sql`SELECT version()`;
    console.log('Database version:', result[0]);
    
    // Database health check removed for simplicity
    
    return result[0];
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}