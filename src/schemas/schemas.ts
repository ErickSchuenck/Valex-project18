import joi from "joi"

export const cardSchema = joi.object({
  workerIdentifier: joi.number().required(),
  cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
})