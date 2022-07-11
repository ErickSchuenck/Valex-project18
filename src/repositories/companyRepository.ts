import { connection } from "../config/database.js";
import chalk from "chalk";

export interface Company {
  id: number;
  name: string;
  apiKey?: string;
}

export async function findByApiKey(apiKey: string) {
  console.log(chalk.red('entrou'))
  const result = await connection.query<Company, [string]>(
    `SELECT * FROM companies WHERE "apiKey"=$1`,
    [apiKey]
  );

  return result.rows[0];
}
