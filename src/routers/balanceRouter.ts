import { Router } from "express";
import {validateSchema} from "../middlewares/cardMiddleware.js"
import { verificationSchema } from "../schemas/schemas.js";
import { getCardBalance } from "../controllers/balanceController.js";

const balanceRouter = Router();
balanceRouter.get("/balance", validateSchema(verificationSchema), getCardBalance);

export default balanceRouter;
