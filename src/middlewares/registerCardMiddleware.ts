import chalk from 'chalk';
import { Request, Response, NextFunction } from "express";
import {cardSchema} from '../schemas/schemas.js'
import {findByApiKey } from '../repositories/companyRepository.js'
import {findById} from '../repositories/employeeRepository.js'
import { findByTypeAndEmployeeId, TransactionTypes } from '../repositories/cardRepository.js';



export function validateSchema(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => { 
      const {error} = schema.validate(req.body, {abortEarly: false});
      if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
      }
      next();
    }
};

export async function checkForApiKeyExistance(req : Request, res : Response, next : NextFunction ){
  console.log(chalk.blue(2))
  const key : string = req.headers["x-api-key"].toString();
  console.log(chalk.red(key))
  const verification = await findByApiKey(key);
  console.log(chalk.red(verification))
  if (!verification){
    throw { 
      type: "not_found", 
      message: "Api key not found in database" 
    }
  }
  next()
}

export async function checkForWorkerExistance(req : Request, res : Response, next : NextFunction ){
  console.log(chalk.blue(3))
  const { employeeId } : { employeeId: number} = req.body;
  const verification = await findById(employeeId)
  if (!verification){
    throw { 
      type: "unprocessable_entity", 
      message: "Worker not found in database" 
    }
  }
  next()
}

export async function checkForWorkerCardUniqueness(req : Request, res : Response, next : NextFunction ){
  console.log(chalk.blue(req.body))
  const { employeeId, cardType } : { employeeId: number; cardType : TransactionTypes} = req.body;
  const result = await findByTypeAndEmployeeId(cardType, employeeId)
  if (result) {
    throw { 
      type: "card_redundancy", 
      message: "This card is already registered" 
    }
  }
  next()
}
