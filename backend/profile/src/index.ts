import express from "express";
import {
	setupAuthMiddleware,
	setupDatabaseConnection,
	setupErrorMiddleware,
	setupInternalAPI,
	setupLogger,
	setupParsers,
	setupRouter,
	setupStaticDirectories,
} from "./config/server.setup";
import { Port } from "./constants/constants";
import { startConsumingNewProfiles } from "./mq/NewProfile.consumer";

const app = express();

app.use((req, res, next) => {
	console.log(req.path);
	return next();
});

setupDatabaseConnection();
setupLogger(app);
setupStaticDirectories(app);
setupParsers(app);
startConsumingNewProfiles();
setupInternalAPI(app);
setupAuthMiddleware(app);
setupRouter(app);
setupErrorMiddleware(app);

app.listen(Port as number, "0.0.0.0", () =>
	console.log(`Listening On Port ${Port}`)
);
