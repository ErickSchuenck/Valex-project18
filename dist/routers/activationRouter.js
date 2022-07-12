import { Router } from "express";
import { validateSchema } from "../middlewares/registerCardMiddleware.js";
import { activateCard } from "../controllers/activationController.js";
import { activationSchema } from "../schemas/schemas.js";
var activationRouter = Router();
activationRouter.post("/activateCreditCard", validateSchema(activationSchema), activateCard);
export default activationRouter;
