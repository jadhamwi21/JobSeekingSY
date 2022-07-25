import { ProfileService } from "../services/ProfileService";
import {
	ISeekerProfile,
	RecruiterProfileUpdateBody,
	SeekerProfileUpdateBody,
	TypedHandler,
} from "../types/types";

const updateSeekerProfile: TypedHandler<SeekerProfileUpdateBody> = async (
	req,
	res,
	next
) => {
	const seekerProfileUpdate = req.body;

	const username = req.username!;
	try {
		await ProfileService.seekerProfileUpdate(username, seekerProfileUpdate);
		return res.status(204).send({
			notification: {
				message: "Profile",
				description: "Profile updated successfully",
			},
		});
	} catch (e) {
		next(e);
	}
};

const updateRecruiterProfile: TypedHandler<RecruiterProfileUpdateBody> = async (
	req,
	res,
	next
) => {
	const recruiterProfileUpdate = req.body;

	const username = req.username!;
	try {
		await ProfileService.recruiterProfileUpdate(
			username,
			recruiterProfileUpdate
		);
		return res.status(204).send({
			notification: {
				message: "Profile Edit",
				description: "Profile updated successfully",
			},
		});
	} catch (e) {
		next(e);
	}
};

export const UpdationController = {
	updateSeekerProfile,
	updateRecruiterProfile,
};
