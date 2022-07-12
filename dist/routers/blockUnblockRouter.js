import { Router } from "express";
import { validateSchema } from "../middlewares/cardMiddleware.js";
import { verificationSchema } from "../schemas/schemas.js";
import { blockCard, unblockCard } from "../controllers/activationController";
var blockUnblockRouter = Router();
blockUnblockRouter.post("/block", validateSchema(verificationSchema), blockCard);
blockUnblockRouter.post("/unblock", validateSchema(verificationSchema), unblockCard);
export default blockUnblockRouter;
