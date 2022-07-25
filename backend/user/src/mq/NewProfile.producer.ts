import { rabbitMqConnection } from ".";
import { INewProfile, Role } from "../types/types";

export const produceNewProfile = (
	profile: INewProfile,
	username: string,
	role: Role
) => {
	rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			channel.publish(
				"profiles",
				role,
				Buffer.from(JSON.stringify({ profile, username }))
			);
		});
};
