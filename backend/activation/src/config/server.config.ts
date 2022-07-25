import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ErrorMiddleware } from "../middlewares/ErrorMiddleware";
import { ActivationRouter } from "../routers/ActivationRouter";
import { InternalRouter } from "../routers/InternalRouter";

export const setupLogger = (app: Application) => {
	app.use(morgan("combined"));
};

export const setupParsers = (app: Application) => {
	app.use(cors({ origin: "http://localhost:3000" }));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
};

export const setupRouter = (app: Application) => {
	app.use("/activation", ActivationRouter);
};

export const setupInternalAPI = (app: Application) => {
	app.use("/api", InternalRouter);
};

export const setupErrorMiddleware = (app: Application) => {
	app.use(ErrorMiddleware);
};

export const setupAuthMiddleware = (app: Application) => {
	app.use(AuthMiddleware);
};

export const setupDatabaseConnection = async () => {
	try {
		await mongoose.connect(`${process.env.database_url as string}`);
	} catch (e) {
		throw e;
	}
};
