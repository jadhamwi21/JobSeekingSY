import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ErrorMiddleware } from "../middlewares/ErrorMiddleware";
import { InternalRouter } from "../routers/InternalRouter";
import { ProfileRouter } from "../routers/ProfileRouter";

export const setupParsers = (app: Application) => {
	app.use(cors({ origin: "http://localhost:3000" }));
	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
	app.use(cookieParser());
};

export const setupDatabaseConnection = async () => {
	try {
		await mongoose.connect(`${process.env.database_url as string}`);
	} catch (e) {
		throw e;
	}
};

export const setupLogger = (app: Application) => {
	app.use(morgan("combined"));
};

export const setupAuthMiddleware = (app: Application) => {
	app.use(AuthMiddleware);
};

export const setupRouter = (app: Application) => {
	app.use("/profile", ProfileRouter);
};

export const setupInternalAPI = (app: Application) => {
	app.use("/api", InternalRouter);
};

export const setupErrorMiddleware = (app: Application) => {
	app.use(ErrorMiddleware);
};

export const setupStaticDirectories = (app: Application) => {
	app.use("/profile/images", express.static("data/images"));
	app.use("/profile/resumes", express.static("data/resumes"));
};
