import { createClient } from "redis";

const getRedisClient = async () => {
	const redisClient = createClient({
		url: `${process.env.redis_url as string}`,
	});

	redisClient.on("error", (err) => console.log(err));
	await redisClient.connect();

	return redisClient;
};

export const RedisService = {
	getRedisClient,
};
