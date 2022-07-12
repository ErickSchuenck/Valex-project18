import chalk from "chalk";
import { Request, Response } from "express";
import * as cardsServices from "../services/cardServices.js"
import { checkForCardExistance, checkForCardExpirationDate, checkForPasswordMatch, checkIfCardIsBlocked } from "../utils/cardUtils.js";
import bcrypt from "bcrypt"


export async function activateCard(req: Request, res: Response) {
  const {id, securityCode, password} = req.body;
  await cardsServices.activateCard(id, securityCode, password)
  console.log(chalk.red('Card Activated!'))
  res.sendStatus(200) 
}


export async function blockCard(req: Request, res: Response) {
  const {id, password} = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);
  const card = await checkForCardExistance(id);
  await checkForPasswordMatch(id, encryptedPassword);
  await checkForCardExpirationDate(card.expirationDate);
  await checkIfCardIsBlocked(card);
  await cardsServices.blockCard(id);
  res.send('Card blocked').status(200)
}