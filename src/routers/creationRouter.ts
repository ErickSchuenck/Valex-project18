import { Router } from "express";
import { createCreditCard } from "../controllers/creationController.js";
import {checkIfCardTypeIsValid, checkForApiExistance} from "../middlewares/cardMiddleware.js"


const creationRouter = Router();

creationRouter.post("/createCreditCard", checkIfCardTypeIsValid, checkForApiExistance, createCreditCard);

export default creationRouter;
