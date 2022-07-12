import { Router } from "express";
import {checkForApiKeyExistance, validateSchema} from "../middlewares/cardMiddleware.js"
import { verificationSchema } from "../schemas/schemas.js";
import { getCardBalance } from "../controllers/balanceController.js";

const balanceRouter = Router();
balanceRouter.get("/balance", validateSchema(verificationSchema), getCardBalance);
balanceRouter.post("/recharge", validateSchema(verificationSchema), checkForApiKeyExistance, )
export default balanceRouter;
