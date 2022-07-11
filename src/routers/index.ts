import { Router } from "express";
import creationRouter from "./creationRouter.js";
import activationRouter from "./activationRouter.js";

const router = Router();
router.use(creationRouter);
router.use(activationRouter);

export default router;