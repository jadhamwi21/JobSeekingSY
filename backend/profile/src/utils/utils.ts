export const removeEmptyValueTransformer = (val: any) => {
	if (val === "" || val === null || val === undefined) return undefined;
	return val;
};

export const getProfilePictureNameByUsername = (username: string) =>
	`${username}.png`;

export const getResumeNameByUsername = (username: string) => `${username}.pdf`;
