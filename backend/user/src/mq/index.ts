import amqp from "amqplib";
import { rabbitMqUrl } from "../constants/constants";

export const rabbitMqConnection = amqp.connect(rabbitMqUrl);

const setupProfilesExchange = async () => {
	await rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			await channel.assertExchange("profiles", "direct", {
				durable: true,
			});
		});
};

const setupProfilesQueues = async () => {
	await rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			await channel.assertQueue("new_seekers_profiles", {
				durable: true,
			});
			await channel.assertQueue("new_recruiters_profiles", {
				durable: true,
			});
		});
};

const setupProfilesBindings = async () => {
	await rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			await channel.bindQueue("new_seekers_profiles", "profiles", "Seeker");
			await channel.bindQueue(
				"new_recruiters_profiles",
				"profiles",
				"Recruiter"
			);
		});
};

const setupActivationsExchange = async () => {
	await rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			await channel.assertExchange("activations", "direct", { durable: true });
		});
};

const setupActivationsQueues = async () => {
	await rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			await channel.assertQueue("new_unactivated_accounts", {
				durable: true,
			});
		});
};

const setupActivationsBindings = async () => {
	await rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			await channel.bindQueue(
				"new_unactivated_accounts",
				"activations",
				"dispatch_new_unactivated_account"
			);
		});
};

export const setupProfilesBroker = async () => {
	await setupProfilesExchange();
	await setupProfilesQueues();
	await setupProfilesBindings();
};

export const setupActivationsBroker = async () => {
	await setupActivationsExchange();
	await setupActivationsQueues();
	await setupActivationsBindings();
};
