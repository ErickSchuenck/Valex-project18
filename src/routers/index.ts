import { Router } from "express";
import creationRouter from "./creationRouter.js";


const router = Router();
router.use(creationRouter);

export default router;