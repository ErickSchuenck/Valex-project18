import { 
  Router 
} from "express";
import { 
  createCreditCard 
} from "../controllers/creationController.js";
import {
  checkIfCardTypeIsValid, 
  checkForApiExistance, 
  checkForWorkerExistance
} from "../middlewares/registerCardMiddleware.js"


const creationRouter = Router();

creationRouter.post(
  "/createCreditCard", 
  checkIfCardTypeIsValid, 
  checkForApiExistance, 
  checkForWorkerExistance, 
  createCreditCard
  );

export default creationRouter;
