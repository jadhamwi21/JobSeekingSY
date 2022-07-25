import { rabbitMqConnection } from ".";
import { ActivationModel } from "../models/ActivationModel";
import { INewUnactivatedAccount } from "../ts/interfaces/broker.interfaces";

export const startConsumingNewUnactivatedAccounts = () => {
	rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			await channel.assertQueue("new_unactivated_accounts", { durable: true });
			channel.consume("new_unactivated_accounts", async (message) => {
				if (message && message.content) {
					const { username, email }: INewUnactivatedAccount = JSON.parse(
						message.content.toString()
					);
					try {
						await ActivationModel.create({
							username,
							isActivated: false,
							email,
						});

						channel.ack(message);
					} catch (e) {
						channel.nack(message);
					}
				}
			});
		});
};
