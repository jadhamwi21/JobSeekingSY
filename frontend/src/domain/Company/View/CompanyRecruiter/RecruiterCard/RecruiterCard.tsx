import { Image } from "antd";
import React from "react";
import { IGetProfileDetailsResponse } from "../../../../../types/types";
import {
	RecruiterCardContainer,
	RecruiterCardProfilePicture,
} from "./RecruiterCard.styles";
import DefaultAvatarIcon from "../../../../../assets/icons/DefaultAvatar.svg";
import Typography from "../../../../../components/Typography/Typography";
import {
	formUserFullName,
	getProfilePicturePath,
} from "../../../../../utils/utils";

type Props = {
	recruiter: IGetProfileDetailsResponse;
};

const RecruiterCard = ({ recruiter }: Props) => {
	const { first_name, middle_name, last_name, profile_picture } = recruiter;
	return (
		<RecruiterCardContainer>
			<RecruiterCardProfilePicture
				preview={false}
				src={
					profile_picture
						? getProfilePicturePath(profile_picture)
						: DefaultAvatarIcon
				}
			/>
			<Typography color="blue">
				{formUserFullName({
					firstName: first_name!,
					middleName: middle_name,
					lastName: last_name!,
				})}
			</Typography>
		</RecruiterCardContainer>
	);
};

export default RecruiterCard;
