import { Router } from "express";
import { CodeController } from "../controllers/CodeController";

export const CodeRouter = Router();

CodeRouter.post("/delivery", CodeController.deliverActivationCode);

CodeRouter.post("/submission", CodeController.activationCodeSubmission);
