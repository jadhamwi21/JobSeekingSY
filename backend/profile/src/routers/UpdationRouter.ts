import { Router } from "express";
import { UpdationController } from "../controllers/UpdationController";

import { RecruiterProfileUpdateMiddleware } from "../middlewares/RecruiterProfileUpdateMiddleware";
import { SeekerProfileUpdateMiddleware } from "../middlewares/SeekerProfileUpdateMiddleware";
import { TypedHandler } from "../types/types";

export const UpdationRouter = Router();

UpdationRouter.put(
	"/seeker",
	SeekerProfileUpdateMiddleware,
	UpdationController.updateSeekerProfile
);

UpdationRouter.put(
	"/recruiter",
	RecruiterProfileUpdateMiddleware,
	UpdationController.updateRecruiterProfile
);
