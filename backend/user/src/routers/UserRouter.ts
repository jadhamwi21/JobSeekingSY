import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { LoginMiddleware } from "../middlewares/LoginMiddleware";
import { RefreshTokenMiddleware } from "../middlewares/RefreshTokenMiddleware";
import { SignupMiddleware } from "../middlewares/SignupMiddleware";

export const UserRouter = Router();

UserRouter.post("/signup", SignupMiddleware, UserController.signup);

UserRouter.post("/login", LoginMiddleware, UserController.login);

UserRouter.post("/logout", UserController.logout);

UserRouter.get("/refresh", RefreshTokenMiddleware, UserController.refresh);
