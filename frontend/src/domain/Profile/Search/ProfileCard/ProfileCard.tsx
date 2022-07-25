import { AnimatePresence, motion } from "framer-motion";
import LinesEllipsis from "react-lines-ellipsis";
import DefaultAvatarIcon from "../../../../assets/icons/DefaultAvatar.svg";
import Button from "../../../../components/Button/Button";
import Link from "../../../../components/Link/Link";
import PdfViewer from "../../../../components/PDF/Viewer/PdfViewer";
import Typography from "../../../../components/Typography/Typography";
import { TransitionProps } from "../../../../constants/constants";
import { useToggle } from "../../../../hooks/useToggle";
import { IGetProfileDetailsResponse } from "../../../../types/types";
import {
	formUserFullName,
	getProfilePicturePath,
} from "../../../../utils/utils";
import { CardProfilePicture, ProfileCardContainer } from "./ProfileCard.styles";

type Props = {
	profile: IGetProfileDetailsResponse;
};

const ProfileCard = ({ profile }: Props) => {
	const {
		first_name,
		last_name,
		middle_name,
		resume,
		profession,
		profile_picture,
		bio,
	} = profile;
	const { toggleOn, toggleOff, toggleState } = useToggle();
	return (
		<ProfileCardContainer expanded={toggleState}>
			<CardProfilePicture
				src={
					profile_picture
						? getProfilePicturePath(profile_picture)
						: DefaultAvatarIcon
				}
				preview={false}
			/>
			<Typography color="blue">
				{formUserFullName({
					firstName: first_name!,
					lastName: last_name!,
					middleName: middle_name,
				})}
			</Typography>
			<Typography color="blue">{profession!}</Typography>
			<AnimatePresence exitBeforeEnter>
				<motion.div
					{...TransitionProps}
					key={toggleState ? 1 : 0}
					style={{
						height: "100%",
						width: "100%",
					}}
				>
					{(resume || bio) && (
						<>
							<LinesEllipsis
								text={bio!}
								maxLine={toggleState ? "10000000" : "5"}
								ellipsis="..."
								trimRight
								basedOn="letters"
								style={{ margin: "2em 0px" }}
							/>

							<Button
								buttonType="button"
								onClick={() => {
									toggleOn();
								}}
								hidden={toggleState}
								center={true}
							>
								Expand
							</Button>
							{toggleState && resume && (
								<PdfViewer pdfUrl={resume!} withFullscreenPlugin />
							)}
							{toggleState && (
								<Link onClick={toggleOff} size="C" center={true}>
									Collapse
								</Link>
							)}
						</>
					)}
				</motion.div>
			</AnimatePresence>
		</ProfileCardContainer>
	);
};

export default ProfileCard;
