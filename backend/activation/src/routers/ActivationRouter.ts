import { Router } from "express";
import { ActivationController } from "../controllers/ActivationController";
import { CodeRouter } from "./CodeRouter";

export const ActivationRouter = Router();

ActivationRouter.get("/", ActivationController.getActivation);

ActivationRouter.use("/code", CodeRouter);
