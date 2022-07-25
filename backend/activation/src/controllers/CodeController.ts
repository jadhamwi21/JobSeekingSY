import { ActivationModel } from "../models/ActivationModel";
import { ActivationCodeService } from "../services/ActivationCodeService";
import { EmailService } from "../services/EmailService";
import { RedisService } from "../services/RedisService";
import { IActivationCodeSubmissionRequestBody } from "../ts/interfaces/controllers.interfaces";
import { TypedHandler } from "../ts/types/app.types";

const deliverActivationCode: TypedHandler = async (req, res) => {
	const { username } = req;

	const user = await ActivationModel.findByUsername(username!);
	if (user!.isActivated) {
		return res.status(200).send({
			notification: {
				message: "Activation",
				description: "Account already activated",
			},
		});
	} else {
		const newActivationCode = ActivationCodeService.getNewActivationCode();
		await ActivationCodeService.setUserCurrentActivationCode(
			username!,
			newActivationCode
		);
		await EmailService.sendActivationCodeToEmail(
			newActivationCode,
			user!.email!
		);
		return res.status(200).send({
			notification: {
				message: "Activation",
				description: "An Activation Code has been sent",
			},
		});
	}
};

const activationCodeSubmission: TypedHandler<
	IActivationCodeSubmissionRequestBody
> = async (req, res) => {
	const { code } = req.body;
	const { username } = req;
	if (code.length > 4 || code.length <= 0) {
		return res.status(400).send({
			notification: {
				message: "Invalid Code",
				description: `Invalid Code Format`,
			},
		});
	}
	const isCorrectActivationCode =
		await ActivationCodeService.checkActivationCode(username!, code!);
	if (isCorrectActivationCode) {
		await ActivationModel.updateOne({ username }, { isActivated: true });
		const redisClient = await RedisService.getRedisClient();
		await redisClient.del(username!);
		return res.status(200).send({
			notification: {
				message: "Account Activation",
				description: "Your Account has been activated",
			},
		});
	} else {
		return res.status(422).send({
			notification: {
				message: "Account Activation Error",
				description: "Incorrect code, try again...",
			},
		});
	}
};

export const CodeController = {
	deliverActivationCode,
	activationCodeSubmission,
};
