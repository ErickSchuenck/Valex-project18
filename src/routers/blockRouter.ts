import { Router } from "express";
import {validateSchema} from "../middlewares/cardMiddleware.js"
import { verificationSchema } from "../schemas/schemas.js";
import { blockCard } from "../controllers/activationController";

const blockRouter = Router();
blockRouter.post("/block", validateSchema(verificationSchema), blockCard);

export default blockRouter;
