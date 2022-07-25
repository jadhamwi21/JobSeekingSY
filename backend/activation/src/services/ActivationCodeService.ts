import randomString from "randomstring";
import { createClient } from "redis";
import { RedisService } from "./RedisService";

const getNewActivationCode = () => {
	const code = randomString.generate({
		length: 4,
		readable: true,
		charset: "alphanumeric",
		capitalization: "uppercase",
	});

	return code;
};

const setUserCurrentActivationCode = async (username: string, code: string) => {
	const redisClient = await RedisService.getRedisClient();
	const MINUTE = 60;
	const CODE_DELETION_TIME = MINUTE * 15;
	await redisClient.set(username, code, { EX: CODE_DELETION_TIME });
};

const checkActivationCode = async (username: string, code: string) => {
	const redisClient = await RedisService.getRedisClient();

	const activationCodeSet = await redisClient.get(username);
	if (activationCodeSet === code) {
		return true;
	} else {
		return false;
	}
};

export const ActivationCodeService = {
	getNewActivationCode,
	setUserCurrentActivationCode,
	checkActivationCode,
};
