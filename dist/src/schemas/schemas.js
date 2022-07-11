import joi from "joi";
export var cardSchema = joi.object({
    workerIdentifier: joi.number().required(),
    cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
});
export var activationSchema = joi.object({
    number: joi.string().required(),
    securityCode: joi.string().required().length(3).pattern(/^[0-9]+$/),
    password: joi.string().required().min(3).pattern(/^[0-9]+$/),
    cardholderName: joi.string().required(),
    expirationDate: joi.string().required()
});
// {
//     "number":"12345 12345 12345 12345",
//     "securityCode": "123",
//     "cardholderName": "FULANO S DRIVEN",
//     "expirationDate": "07/2017"
// }
