import { 
  Router 
} from "express";
import { 
  createCreditCard 
} from "../controllers/creationController.js";
import {
  validateSchema, 
  checkForApiKeyExistance,
} from "../middlewares/registerCardMiddleware.js"
import { cardSchema } from "../schemas/schemas.js";


const creationRouter = Router();

creationRouter.post(
  "/createCreditCard", 
  validateSchema(cardSchema), 
  checkForApiKeyExistance, 
  createCreditCard
  );

export default creationRouter;
