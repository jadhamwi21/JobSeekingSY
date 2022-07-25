import fs from "fs";
import { getProfilePictureNameByUsername } from "../utils/utils";

const saveNewProfilePicture = (username: string, profilePicture: string) => {
	try {
		const profilePictureSlice = profilePicture.split(";base64,").pop();
		const fileName = getProfilePictureNameByUsername(username);
		fs.writeFileSync(`data/images/${fileName}`, profilePictureSlice!, {
			encoding: "base64",
		});
	} catch (e) {
		console.log(e);
	}
};

export const ProfilePictureService = {
	saveNewProfilePicture,
};
