import { rabbitMqConnection } from ".";

export const produceNewUnactivatedAccount = (
	username: string,
	email: string
) => {
	rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			channel.publish(
				"activations",
				"dispatch_new_unactivated_account",
				Buffer.from(JSON.stringify({ username, email }))
			);
		});
};
