import { useEffect, useState } from "react";
import DefaultAvatarIcon from "../../../../assets/icons/DefaultAvatar.svg";
import Button from "../../../../components/Button/Button";
import PdfViewer from "../../../../components/PDF/Viewer/PdfViewer";
import Section from "../../../../components/Section/Section";
import Typography from "../../../../components/Typography/Typography";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import { selectUserProfileState } from "../../../../redux/selectors/profileSelectors";
import { useAppSelector } from "../../../../redux/store/store";
import {
	formUserFullName,
	getProfilePicturePath,
} from "../../../../utils/utils";
import ProfileDetailsBody from "../Body/ProfileDetailsBody";
import ProfileTop from "../Top/ProfileTop";
import { ProfileTopProfilePicture } from "../Top/ProfileTop.styles";
import { SeekerProfileTopDetailsContainer } from "./SeekerProfile.styles";

type Props = {
	toggleEdit: () => void;
};

const SeekerProfileDetails = ({ toggleEdit }: Props) => {
	useScrollToTop();
	const { fullName, profession, profile_picture, governorate, bio, resume } =
		useAppSelector(selectUserProfileState);
	return (
		<>
			<ProfileTop>
				<ProfileTopProfilePicture
					src={
						profile_picture
							? getProfilePicturePath(profile_picture)
							: DefaultAvatarIcon
					}
				/>
				<SeekerProfileTopDetailsContainer>
					<Typography color="blue">{formUserFullName(fullName!)}</Typography>
					<Typography color="dark-gray">{profession!}</Typography>
					<Typography color="blue">{governorate}</Typography>
				</SeekerProfileTopDetailsContainer>
			</ProfileTop>
			<ProfileDetailsBody>
				<Section title="BIO" centerContent={bio ? false : true}>
					<Typography color="blue">{bio ? bio : "No Bio"}</Typography>
				</Section>
				<Section title="RESUME" centerContent>
					{resume ? (
						<PdfViewer pdfUrl={resume} withFullscreenPlugin />
					) : (
						<Typography color="blue">No Resume</Typography>
					)}
				</Section>

				<Button buttonType="button" center onClick={toggleEdit}>
					Edit Profile
				</Button>
			</ProfileDetailsBody>
		</>
	);
};

export default SeekerProfileDetails;
