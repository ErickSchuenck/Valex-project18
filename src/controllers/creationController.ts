import Cryptr from "cryptr"
import { Request, Response } from "express";
import { checkForWorkerCardUniqueness, checkForWorkerExistance } from "../middlewares/registerCardMiddleware.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as cardsServices from "../services/cardServices.js"

const cryptr = new Cryptr(process.env.SECRET);

export async function createCreditCard(req: Request, res: Response) {
  const {id, cardType} : {
    id: number, 
    cardType: TransactionTypes
  } = req.body;
  await checkForWorkerExistance(id);
  await checkForWorkerCardUniqueness(id, cardType);
  const data = await cardsServices.createCard(id, cardType);
  const cvc = cryptr.decrypt(data.securityCode)
  res.status(201).send(`Your card was created! Here is your cvc: ${cvc}`);
}
