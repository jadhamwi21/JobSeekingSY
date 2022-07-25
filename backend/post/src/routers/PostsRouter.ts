import { Router } from "express";
import { PostsController } from "../controllers/PostsController";
import { AccountActivationCheckMiddleware } from "../middlewares/AccountActivationCheckMiddleware";
import { ProfileSetupCheckMiddleware } from "../middlewares/ProfileSetupCheckMiddleware";
import { SeekerAuthMiddleware } from "../middlewares/SeekerAuthMiddleware";
import { SavedRouter } from "./SavedRouter";

export const PostsRouter = Router();

PostsRouter.get(
	"/",
	SeekerAuthMiddleware,
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	PostsController.getPosts
);

PostsRouter.get(
	"/recruiter",
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	PostsController.getRecruiterPosts
);

PostsRouter.use(
	"/saved",
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	SavedRouter
);

PostsRouter.get(
	"/:company_name",
	SeekerAuthMiddleware,
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	PostsController.getCompanyPosts
);
