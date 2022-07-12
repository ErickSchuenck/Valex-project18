import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as cardServices from "../services/cardServices.js"
import * as cardUtils from "../utils/cardUtils.js"
import bcrypt from "bcrypt"

export async function getCardBalance(req: Request, res: Response) {
  const {id, password} : {
    id: number, 
    password: TransactionTypes
  } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);
  await cardUtils.checkForPasswordMatch(id, encryptedPassword)
  const balance = await cardServices.getCardBalance(id, password)
  return res.status(200).send(balance);
}

export async function rechargeCard(req: Request, res: Response) {
    const { id, amount } = req.body;
    await cardServices.rechargeCard(id, amount);
    res.sendStatus(200);
}

export async function registerPayment(req: Request, res: Response) {
  const { id, password, businessId, amount } = req.body;
  await cardServices.registerPayment(id, password, businessId, amount);
  res.sendStatus(200);
}