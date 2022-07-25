import { Express } from "express";
import { Role } from "../../src/types/types";

declare global {
	declare namespace Express {
		interface Request {
			username?: string;
			role?: Role;
		}
	}
}
