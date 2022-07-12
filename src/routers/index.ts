import { Router } from "express";
import creationRouter from "./creationRouter.js";
import activationRouter from "./activationRouter.js";
import balanceRouter from "./balanceRouter.js";
import blockRouter from "./blockRouter.js";

const router = Router();
router.use(creationRouter);
router.use(activationRouter);
router.use(balanceRouter);
router.use(blockRouter);

export default router;