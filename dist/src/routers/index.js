import { Router } from "express";
import creationRouter from "./creationRouter.js";
import activationRouter from "./activationRouter.js";
var router = Router();
router.use(creationRouter);
router.use(activationRouter);
export default router;
