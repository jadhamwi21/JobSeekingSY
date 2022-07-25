import { Router } from "express";
import { SavedController } from "../controllers/SavedController";
import { SeekerAuthMiddleware } from "../middlewares/SeekerAuthMiddleware";

export const SavedRouter = Router();

SavedRouter.get("/", SeekerAuthMiddleware, SavedController.getSeekerSavedPosts);

SavedRouter.post("/", SeekerAuthMiddleware, SavedController.savePost);

SavedRouter.delete(
	"/:postId",
	SeekerAuthMiddleware,
	SavedController.unsavePost
);

SavedRouter.get(
	"/lookup/:postId",
	SeekerAuthMiddleware,
	SavedController.lookupSavedPost
);
