import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
var Pool = pg.Pool;
var db = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
export var connection = new Pool(db);
