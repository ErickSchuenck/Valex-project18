import { Router } from "express";
import { createCreditCard } from "../controllers/creationController.js";

const creationRouter = Router();

creationRouter.post("/createCreditCard", createCreditCard);

export default creationRouter;
