import { Request, Response } from "express";
import { checkForWorkerCardUniqueness, checkForWorkerExistance } from "../middlewares/registerCardMiddleware.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as cardsServices from "../services/cardServices.js"


export async function createCreditCard(req: Request, res: Response) {
  const {id, cardType} : {
    id: number, 
    cardType: TransactionTypes
  } = req.body;
  await checkForWorkerExistance(id);
  await checkForWorkerCardUniqueness(id, cardType);
  await cardsServices.createCard(id, cardType);
  res.sendStatus(201);
}
