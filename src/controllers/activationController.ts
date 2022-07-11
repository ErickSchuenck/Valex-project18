import chalk from "chalk";
import { Request, Response } from "express";
import * as cardsServices from "../services/cardServices.js"


export async function activateCard(req: Request, res: Response) {
  const {id, securityCode, password} = req.body;
  await cardsServices.activateCard(id, securityCode, password)
  console.log(chalk.red('Card Activated!'))
  res.sendStatus(200) 
}
