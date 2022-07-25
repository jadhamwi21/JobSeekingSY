import React from "react";
import Button from "../../../../components/Button/Button";
import Section from "../../../../components/Section/Section";
import Typography from "../../../../components/Typography/Typography";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import { selectUserProfileState } from "../../../../redux/selectors/profileSelectors";
import { useAppSelector } from "../../../../redux/store/store";
import {
	appendDateToForceFetchProfilePicture,
	formUserFullName,
	getProfilePicturePath,
} from "../../../../utils/utils";
import ProfileDetailsBody from "../Body/ProfileDetailsBody";
import ProfileTop from "../Top/ProfileTop";
import { ProfileTopProfilePicture } from "../Top/ProfileTop.styles";
import { RecruiterProfileTopDetailsContainer } from "./RecruiterProfile.styles";
import DefaultAvatarIcon from "../../../../assets/icons/DefaultAvatar.svg";

type Props = {
	toggleEdit: () => void;
};

const RecruiterProfileDetails = ({ toggleEdit }: Props) => {
	useScrollToTop();
	const {
		fullName,
		company_description,
		company_name,
		governorate,
		profile_picture,
	} = useAppSelector(selectUserProfileState);
	return (
		<>
			<ProfileTop>
				<ProfileTopProfilePicture
					src={
						profile_picture
							? appendDateToForceFetchProfilePicture(
									getProfilePicturePath(profile_picture)
							  )
							: DefaultAvatarIcon
					}
				/>
				<RecruiterProfileTopDetailsContainer>
					<Typography color="blue">{formUserFullName(fullName!)}</Typography>
					<Typography color="dark-gray">{governorate}</Typography>
				</RecruiterProfileTopDetailsContainer>
			</ProfileTop>
			<ProfileDetailsBody>
				<Section title="Company Name" centerContent>
					<Typography color="blue">{company_name!}</Typography>
				</Section>
				<Section title="Company Description">
					<Typography color="blue">{company_description!}</Typography>
				</Section>
				<Button buttonType="button" center onClick={toggleEdit}>
					Edit Profile
				</Button>
			</ProfileDetailsBody>
		</>
	);
};

export default RecruiterProfileDetails;
