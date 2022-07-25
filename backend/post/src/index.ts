import express from "express";
import {
	setupAuthMiddleware,
	setupDatabaseConnection,
	setupErrorMiddleware,
	setupLogger,
	setupParsers,
	setupRouters,
} from "./config/server.config";
import { Port } from "./constants/constants";

const app = express();

setupDatabaseConnection();
setupParsers(app);
setupLogger(app);
setupAuthMiddleware(app);
setupRouters(app);
setupErrorMiddleware(app);

app.listen(Port as number, "0.0.0.0", () =>
	console.log(`Listening on port ${Port}`)
);
