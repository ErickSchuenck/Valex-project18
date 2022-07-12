import joi, { number } from "joi"

export const cardSchema = joi.object({
  id: joi.number().required(),
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

export const rechargeSchema = joi.object({
    amount: joi.number().integer().min(1).required()
});

export const paymentSchema = joi.object({
    cardId: joi.number().integer().required(),
    password: joi.string().pattern(/[0-9]$/).min(4).max(4).required(),
    businessId: joi.number().integer().required(),
    amount: joi.number().integer().min(1).required()
});