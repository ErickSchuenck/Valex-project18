import {connection} from '../config/database.js'
import { Request, Response, NextFunction } from "express";
import {cardSchema} from '../schemas/schemas.js'
import {findByApiKey } from '../repositories/companyRepository.js'
import {findById} from '../repositories/employeeRepository.js'

export async function checkIfCardTypeIsValid(req : Request, res : Response, next : NextFunction ){
  const { error } = cardSchema.validate(req.body)
  if (error) {
    throw { 
      type: "unprocessable_entity", 
      message: error.details[0].message 
    }
  }
  next()
}

export async function checkForApiExistance(req : Request, res : Response, next : NextFunction ){
  const key : string = req.headers["x-api-key"].toString();
  const verification = await findByApiKey(key)
  if (!verification){ 
    console.log('Api key not found in database')
    throw { 
      type: "unprocessable_entity", 
      message: "invalid api key" 
    }
  }
  next()
}

export async function checkForWorkerExistance(req : Request, res : Response, next : NextFunction ){
  const { workerIdentifier } : { workerIdentifier: number} = req.body;
  const verification = await findById(workerIdentifier)
  if (!verification){ 
    console.log('Worker not found in database')
    throw { 
      type: "unprocessable_entity", 
      message: "Worker not found in database" 
    }
  }
  next()
}
