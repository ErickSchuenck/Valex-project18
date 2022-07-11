import { Router } from "express";
import { validateSchema, } from "../middlewares/registerCardMiddleware.js";
import { activationSchema } from "../schemas/schemas.js";
var activationRouter = Router();
activationRouter.post("/activateCreditCard", validateSchema(activationSchema));
export default activationRouter;
