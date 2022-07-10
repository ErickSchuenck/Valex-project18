import { Request, Response } from "express";
import { TransactionTypes, insert } from "../repositories/cardRepository.js";
import chalk from "chalk";
import * as cardsServices from "../services/cardServices.js"

export async function createCreditCard(req: Request, res: Response) {
  const {employeeId, cardType} : {
    employeeId: number, 
    cardType: TransactionTypes
  } = req.body;
 await cardsServices.createCard(employeeId, cardType);
 res.sendStatus(201);
}
