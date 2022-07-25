import { rabbitMqConnection } from ".";
import { RecruitersProfiles } from "../models/RecruiterProfileModel";
import { SeekersProfiles } from "../models/SeekerProfileModel";
import { INewProfile, IRecruiterProfile, ISeekerProfile } from "../types/types";

interface IConsumeNewProfileMessageContent {
	username: string;
	profile: INewProfile;
}

export const startConsumingNewProfiles = () => {
	rabbitMqConnection
		.then((conn) => conn.createChannel())
		.then(async (channel) => {
			await channel.assertQueue("new_recruiters_profiles", { durable: true });
			await channel.assertQueue("new_seekers_profiles", { durable: true });
			channel.consume("new_recruiters_profiles", async (message) => {
				if (message) {
					try {
						if (message.content) {
							const { profile, username }: IConsumeNewProfileMessageContent =
								JSON.parse(message.content.toString());
							await RecruitersProfiles.create({
								...profile,
								username,
								isSetup: false,
							});
							channel.ack(message);
						}
					} catch (e) {
						channel.nack(message);
					}
				}
			});
			channel.consume("new_seekers_profiles", async (message) => {
				if (message) {
					try {
						if (message.content) {
							const { profile, username }: IConsumeNewProfileMessageContent =
								JSON.parse(message.content.toString());
							await SeekersProfiles.create({
								...profile,
								username,
								isSetup: false,
							});
							channel.ack(message);
						}
					} catch (e) {
						channel.nack(message);
					}
				}
			});
		});
};
