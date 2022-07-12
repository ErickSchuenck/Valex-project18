import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as cardsServices from "../services/cardServices.js"
import * as cardUtils from "../utils/cardUtils.js"
import bcrypt from "bcrypt"

export async function getCardBalance(req: Request, res: Response) {
  const {id, password} : {
    id: number, 
    password: TransactionTypes
  } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);
  await cardUtils.checkForPasswordMatch(id, encryptedPassword)
  const balance = await cardsServices.getCardBalance(id, password)
  return res.status(200).send(balance);
}