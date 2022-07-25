import { Router } from "express";
import { InternalController } from "../controllers/InternalController";

export const InternalRouter = Router();

InternalRouter.get(
	"/profile/:username/setup/status",
	InternalController.getProfileSetupStatus
);
