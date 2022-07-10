import {connection} from '../config/database.js'
import { Request, Response, NextFunction } from "express";
import {cardSchema} from '../schemas/schemas.js'
import {findByApiKey} from '../repositories/companyRepository.js'

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
  const key : string = req.headers["x-api-key"];

  console.log(key)

  if (!findByApiKey(key)){ 
    console.log('Api key not found in database')
    throw { 
      type: "unprocessable_entity", 
      message: "invalid api key" 
    }
  }

  next()
}
