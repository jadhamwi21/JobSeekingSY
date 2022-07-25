import { Companies } from "../models/CompanyProfileModel";

const findCompanyByName = async (name: string) => {
	try {
		const company = await Companies.findOne({ name }).lean();
		if (company) {
			return company;
		} else {
			return null;
		}
	} catch (e) {
		throw e;
	}
};

const addNewCompany = async (
	name: string,
	description: string,
	governorate: string
) => {
	try {
		await Companies.create({ name, description, governorate });
	} catch (e) {
		throw e;
	}
};

export const CompanyService = {
	findCompanyByName,
	addNewCompany,
};
