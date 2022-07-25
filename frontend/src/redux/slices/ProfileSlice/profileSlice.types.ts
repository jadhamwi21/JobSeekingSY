import { Governorate } from "../../../constants/governorates";
import { Profession } from "../../../constants/professions";

export interface IFullname {
	firstName: string;
	middleName?: string;
	lastName: string;
}

export interface IProfileReducerState {
	fullName: IFullname | null;
	governorate: Governorate;
	loading: boolean;
	profile_picture: string;
	profession?: Profession;
	company_name?: string;
	company_description?: string;
	bio?: string;
	resume?: string;
}
