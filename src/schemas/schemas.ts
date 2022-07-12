import joi, { number } from "joi"

export const cardSchema = joi.object({
  workerIdentifier: joi.number().required(),
  cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
})

export const activationSchema = joi.object({
  id: joi.number().required(),
  securityCode: joi.string().pattern(/[0-9]$/).length(3).required(),
  password: joi.string().pattern(/[0-9]$/).length(4).required()
})

export const verificationSchema = joi.object({
  id: joi.number().required(),
  password: joi.string().pattern(/[0-9]$/).length(4).required()
})