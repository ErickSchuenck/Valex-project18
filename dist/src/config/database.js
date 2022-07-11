import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
var Pool = pg.Pool;
export var connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
