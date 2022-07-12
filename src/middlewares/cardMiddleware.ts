import chalk from 'chalk';
import { Request, Response, NextFunction } from "express";
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
  const key : string = req.headers["x-api-key"].toString();
  const verification = await findByApiKey(key);
  if (!verification){
    throw { 
      type: "not_found", 
      message: "Api key not found in database" 
    }
  }
  next()
}

export async function checkForWorkerExistance(employeeId : number){
  console.log(chalk.blue(3))
  const verification = await findById(employeeId)
  if (!verification){
    throw { 
      type: "unprocessable_entity", 
      message: "Worker not found in database" 
    }
  }
}

export async function checkForWorkerCardUniqueness(employeeId : number, cardType : TransactionTypes){
  const result = await findByTypeAndEmployeeId(cardType, employeeId)
  if (result) {
    throw { 
      type: "card_redundancy", 
      message: "This card is already registered" 
    }
  }
}
