import { Router } from "express";
import creationRouter from "./creationRouter.js";
import activationRouter from "./activationRouter.js";
import balanceRouter from "./balanceRouter.js";
import blockUnblockRouter from "./blockUnblockRouter.js";

const router = Router();
router.use(creationRouter);
router.use(activationRouter);
router.use(balanceRouter);
router.use(blockUnblockRouter);

export default router;