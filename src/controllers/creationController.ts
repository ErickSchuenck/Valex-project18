import { Request, Response } from "express";
import * as cardsServices from "../services/cardServices.js"

export async function createCreditCard(req: Request, res: Response) {
  try {
    const {workerIdentifier, cardType} : {
      workerIdentifier: number, 
      cardType: 'groceries' | 'restaurants' | 'transport' | 'education'| 'health';
    } = req.body;

    console.log(workerIdentifier, cardType)
    await cardsServices.register(workerIdentifier, cardType)
    res.sendStatus(201)

  } catch (error) {
    res.send(error)
  }
}
