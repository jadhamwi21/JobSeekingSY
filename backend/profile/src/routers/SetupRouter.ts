import { Router } from "express";
import { SetupController } from "../controllers/SetupController";
import { AccountActivationCheckMiddleware } from "../middlewares/AccountActivationCheckMiddleware";
import { RecruiterProfileSetupMiddleware } from "../middlewares/RecruiterProfileSetupMiddleware";
import { SeekerProfileSetupMiddleware } from "../middlewares/SeekerProfileSetupMiddleware";

export const SetupRouter = Router();

SetupRouter.get("/", SetupController.getProfileIsSetup);

SetupRouter.put(
	"/seeker",
	SeekerProfileSetupMiddleware,
	AccountActivationCheckMiddleware,
	SetupController.seekerProfileSetup
);

SetupRouter.put(
	"/recruiter",
	RecruiterProfileSetupMiddleware,
	AccountActivationCheckMiddleware,
	SetupController.recruiterProfileSetup
);
