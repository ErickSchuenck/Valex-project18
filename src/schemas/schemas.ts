import joi, { number } from "joi"

export const cardSchema = joi.object({
  workerIdentifier: joi.number().required(),
  cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
})

export const activationSchema = joi.object({
  number: joi.string().required(),
  securityCode: joi.string().required().length(3).pattern(/^[0-9]+$/),
  password: joi.string().required().min(3).pattern(/^[0-9]+$/),
  cardholderName: joi.string().required(),
  expirationDate: joi.string().required()
})


// {
//     "number":"12345 12345 12345 12345",
//     "securityCode": "123",
    
//     "cardholderName": "FULANO S DRIVEN",
//     "expirationDate": "07/2017"
// }