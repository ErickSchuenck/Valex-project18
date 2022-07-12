import { Router } from "express";
import { checkForApiKeyExistance, validateSchema } from "../middlewares/cardMiddleware.js";
import { verificationSchema, rechargeSchema, paymentSchema } from "../schemas/schemas.js";
import { getCardBalance, rechargeCard, registerPayment } from "../controllers/balanceController.js";
var balanceRouter = Router();
balanceRouter.get("/balance", validateSchema(verificationSchema), getCardBalance);
balanceRouter.post("/recharge", checkForApiKeyExistance, validateSchema(rechargeSchema), rechargeCard);
balanceRouter.post("/payment", validateSchema(paymentSchema), registerPayment);
export default balanceRouter;
