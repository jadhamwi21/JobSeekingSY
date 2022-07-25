import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";
import { AccountActivationCheckMiddleware } from "../middlewares/AccountActivationCheckMiddleware";
import { ProfileSetupCheckMiddleware } from "../middlewares/ProfileSetupCheckMiddleware";
import { RecruiterAuthMiddleware } from "../middlewares/RecruiterAuthMiddleware";
import { SeekerAuthMiddleware } from "../middlewares/SeekerAuthMiddleware";
import { SetupRouter } from "./SetupRouter";
import { UpdationRouter } from "./UpdationRouter";

export const ProfileRouter = Router();

ProfileRouter.get(
	"/seeker/search/:username",
	RecruiterAuthMiddleware,
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	ProfileController.searchSeekerProfile
);

ProfileRouter.get(
	"/details/user/:username",
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	ProfileController.getProfileDetails
);

ProfileRouter.get(
	"/details",
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	ProfileController.getProfileDetails
);

ProfileRouter.get(
	"/details/company/:company_name",
	SeekerAuthMiddleware,
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	ProfileController.getCompanyProfileDetails
);

ProfileRouter.use(
	"/updation",
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	UpdationRouter
);

ProfileRouter.use("/setup", SetupRouter);
