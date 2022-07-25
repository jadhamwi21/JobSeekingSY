import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { AccountActivationCheckMiddleware } from "../middlewares/AccountActivationCheckMiddleware";
import { PostFormMiddleware } from "../middlewares/PostFormMiddleware";
import { ProfileSetupCheckMiddleware } from "../middlewares/ProfileSetupCheckMiddleware";
import { RecruiterAuthMiddleware } from "../middlewares/RecruiterAuthMiddleware";

export const PostRouter = Router();

PostRouter.post(
	"/",
	RecruiterAuthMiddleware,
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	PostFormMiddleware,
	PostController.createNewPost
);

PostRouter.put(
	"/:postId",
	RecruiterAuthMiddleware,
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	PostFormMiddleware,
	PostController.updatePost
);

PostRouter.delete(
	"/:postId",
	RecruiterAuthMiddleware,
	AccountActivationCheckMiddleware,
	ProfileSetupCheckMiddleware,
	PostController.deletePost
);
