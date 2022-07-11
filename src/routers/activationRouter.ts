import { 
  Router 
} from "express";
import {
  validateSchema,
  checkForCardExistance,
} from "../middlewares/registerCardMiddleware.js"
import { activationSchema } from "../schemas/schemas.js";


const activationRouter = Router();

activationRouter.post(
  "/activateCreditCard", 
  validateSchema(activationSchema),
  // checkForCardExistance,
  
  );

export default activationRouter;
