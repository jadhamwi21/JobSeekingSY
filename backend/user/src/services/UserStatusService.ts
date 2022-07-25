import axios from "axios";

const getAccountActivationStatus = async (username: string) => {
	return await axios
		.get(
			`${
				process.env.activation_service_url as string
			}/api/account/${username}/activation/status`
		)
		.then(({ data }) => data.isActivated);
};

const getProfileSetupStatus = async (username: string) => {
	return await axios
		.get(
			`${
				process.env.profile_service_url as string
			}/api/profile/${username}/setup/status`
		)
		.then(({ data }) => data.isProfileSetup);
};

const getUserStatus = async (username: string) => {
	const isAccountActivated = await getAccountActivationStatus(username);
	const isProfileSetup = await getProfileSetupStatus(username);
	console.log(isProfileSetup, isAccountActivated);
	return { isAccountActivated, isProfileSetup };
};

export const UserStatusService = {
	getUserStatus,
};
