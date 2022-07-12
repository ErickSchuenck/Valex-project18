import { Request, Response } from "express";
import * as cardsServices from "../services/cardServices.js"
import { checkForCardExistance, checkForCardExpirationDate, checkForPasswordMatch, checkIfCardIsBlocked } from "../utils/cardUtils.js";



export async function activateCard(req: Request, res: Response) {
  const {id, securityCode, password} = req.body;
  await cardsServices.activateCard(id, securityCode, password)
  res.sendStatus(200) 
}


export async function blockCard(req: Request, res: Response) {
  const {id, password} = req.body;
  const card = await checkForCardExistance(id);
  await checkForPasswordMatch(id, password);
  await checkForCardExpirationDate(card.expirationDate);
  const cardIsBlocked = await checkIfCardIsBlocked(card);
  if (cardIsBlocked) {
    throw {
      status: 401,
      type: "Unathorized", 
      message: "this card is already blocked" 
    }
  }
  await cardsServices.blockOrUnblockCard(id, 'block');
  res.send('Card blocked').status(200)
}

export async function unblockCard(req: Request, res: Response) {
  const {id, password} = req.body;
  const card = await checkForCardExistance(id);
  await checkForPasswordMatch(id, password);
  await checkForCardExpirationDate(card.expirationDate);
  const cardIsBlocked = await checkIfCardIsBlocked(card);
  if (!cardIsBlocked) {
    throw {
      status: 401,
      type: "Unathorized", 
      message: "this card is not blocked" 
    }
  }
  await cardsServices.blockOrUnblockCard(id, 'unblock');
  res.send('Card unblocked').status(200)
}