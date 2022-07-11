import { Request, Response } from "express";
import { checkForWorkerCardUniqueness, checkForWorkerExistance } from "../middlewares/registerCardMiddleware.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as cardsServices from "../services/cardServices.js"


export async function createCreditCard(req: Request, res: Response) {
  const {employeeId, cardType} : {
    employeeId: number, 
    cardType: TransactionTypes
  } = req.body;
  await checkForWorkerExistance(employeeId);
  await checkForWorkerCardUniqueness(employeeId, cardType);
  await cardsServices.createCard(employeeId, cardType);
  res.sendStatus(201);
}
