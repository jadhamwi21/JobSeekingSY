import { ActivationModel } from "../models/ActivationModel";
import { TypedHandler } from "../ts/types/app.types";

const getAccountActivationStatus: TypedHandler<
	any,
	{ username: string }
> = async (req, res) => {
	const username = req.params.username;
	const user = await ActivationModel.findByUsername(username);
	return res.status(200).send({ isActivated: user?.isActivated! });
};

export const InternalController = {
	getAccountActivationStatus,
};
