import { ActivationModel } from "../models/ActivationModel";
import { TypedHandler } from "../ts/types/app.types";

const getActivation: TypedHandler = async (req, res) => {
	const { username } = req;

	const user = await ActivationModel.findByUsername(username!);
	return res.status(200).send({ isActivated: user!.isActivated });
};

export const ActivationController = {
	getActivation,
};
