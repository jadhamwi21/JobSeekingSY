import { Router } from "express";
import { InternalController } from "../controllers/InternalController";

export const InternalRouter = Router();

InternalRouter.get(
	"/account/:username/activation/status",
	InternalController.getAccountActivationStatus
);
