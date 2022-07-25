import { ProfileService } from "../services/ProfileService";
import { TypedHandler } from "../types/types";

const getProfileSetupStatus: TypedHandler<any, { username: string }> = async (
	req,
	res
) => {
	const username = req.params.username;

	const profile = await ProfileService.findProfile(username, {
		withSetup: true,
		recruiter: true,
		seeker: true,
	});
	return res.status(200).send({ isProfileSetup: profile?.isSetup });
};

export const InternalController = {
	getProfileSetupStatus,
};
