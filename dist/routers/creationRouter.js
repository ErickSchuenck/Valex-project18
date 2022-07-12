import { Router } from "express";
import { createCreditCard } from "../controllers/creationController.js";
import { validateSchema, checkForApiKeyExistance, } from "../middlewares/cardMiddleware.js";
import { cardSchema } from "../schemas/schemas.js";
var creationRouter = Router();
creationRouter.post("/createCreditCard", validateSchema(cardSchema), checkForApiKeyExistance, createCreditCard);
export default creationRouter;
