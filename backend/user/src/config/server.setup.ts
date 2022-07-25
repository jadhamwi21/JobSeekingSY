import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { ErrorMiddleware } from "../middlewares/ErrorMiddleware";
import { UserRouter } from "../routers/UserRouter";

export const setupLogger = (app: Application) => {
	app.use(morgan("combined"));
};

export const setupParsers = (app: Application) => {
	app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
};

export const setupRouter = (app: Application) => {
	app.use("/user", UserRouter);
};

export const setupErrorMiddleware = (app: Application) => {
	app.use(ErrorMiddleware);
};

export const setupDatabaseConnection = async () => {
	try {
		await mongoose.connect(`${process.env.database_url as string}`);
	} catch (e) {
		throw e;
	}
};
