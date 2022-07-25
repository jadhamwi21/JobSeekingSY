import { Express } from "express";
import { Role } from "../../src/ts/types/app.types";

declare global {
	declare namespace Express {
		interface Request {
			username?: string;
			role?: Role;
		}
	}
}
