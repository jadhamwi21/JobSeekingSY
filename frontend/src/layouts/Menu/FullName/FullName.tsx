import { IFullname } from "../../../redux/slices/ProfileSlice/profileSlice.types";
import { formUserFullName } from "../../../utils/utils";
import { FullNameElement } from "./FullName.styles";

type Props = {
	fullName: IFullname;
};

const FullName = ({ fullName }: Props) => {
	return <FullNameElement>{formUserFullName(fullName)}</FullNameElement>;
};

export default FullName;
