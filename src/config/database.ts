// import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config();
// const { Pool } = pg;

// const databaseConfig = {
//   connectionString: process.env.URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// }

// const connection = new Pool(databaseConfig)
// export default connection;

import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});