import express from "express";
import {
	setupAuthMiddleware,
	setupDatabaseConnection,
	setupErrorMiddleware,
	setupInternalAPI,
	setupLogger,
	setupParsers,
	setupRouter,
} from "./config/server.config";
import { Port } from "./constants/constants";
import { startConsumingNewUnactivatedAccounts } from "./mq/NewUnactivatedAccount.consumer";
import { RedisService } from "./services/RedisService";

const app = express();

setupLogger(app);
startConsumingNewUnactivatedAccounts();
setupDatabaseConnection();

setupParsers(app);
setupInternalAPI(app);
setupAuthMiddleware(app);
setupRouter(app);
setupErrorMiddleware(app);

app.listen(Port as number, "0.0.0.0", () => {
	console.log(`Listening on port ${Port}`);
});
