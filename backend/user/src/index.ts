import express from "express";
import { Port } from "./constants/constants";
import { setupActivationsBroker, setupProfilesBroker } from "./mq";
import {
	setupDatabaseConnection,
	setupErrorMiddleware,
	setupLogger,
	setupParsers,
	setupRouter,
} from "./config/server.setup";

const app = express();

setupLogger(app);
setupProfilesBroker();
setupActivationsBroker();
setupDatabaseConnection();
setupParsers(app);
setupRouter(app);
setupErrorMiddleware(app);

app.listen(Port as number, "0.0.0.0", () =>
	console.log(`Listening On Port ${Port}`)
);
