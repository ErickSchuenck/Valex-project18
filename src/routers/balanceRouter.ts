import { Router } from "express";
import {validateSchema} from "../middlewares/registerCardMiddleware.js"
import { balanceSchema } from "../schemas/schemas.js";
import { getCardBalance } from "../controllers/balanceController.js";

const activationRouter = Router();
activationRouter.get("/balance", validateSchema(balanceSchema), getCardBalance);

export default activationRouter;
