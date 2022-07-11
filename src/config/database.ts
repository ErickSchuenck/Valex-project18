import pg from "pg";
import dotenv from "dotenv"

dotenv.config();

const { Pool } = pg;

const db ={
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const connection = new Pool(db);