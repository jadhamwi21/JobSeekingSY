import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { ErrorMiddleware } from "../middlewares/ErrorMiddleware";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { PostRouter } from "../routers/PostRouter";
import { PostsRouter } from "../routers/PostsRouter";

export const setupLogger = (app: Application) => {
	app.use(morgan("combined"));
};

export const setupParsers = (app: Application) => {
	app.use(cors({ origin: "http://localhost:3000" }));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
};

export const setupRouters = (app: Application) => {
	app.use("/post", PostRouter);
	app.use("/posts", PostsRouter);
};

export const setupErrorMiddleware = (app: Application) => {
	app.use(ErrorMiddleware);
};

export const setupAuthMiddleware = (app: Application) => {
	app.use(AuthMiddleware);
};

export const setupDatabaseConnection = async () => {
	try {
		await mongoose.connect(`${process.env.database_endpoint as string}`);
		console.log("connected to db");
	} catch (e) {
		throw e;
	}
};
