import nodemailer from "nodemailer";

const sendActivationCodeToEmail = async (code: string, email: string) => {
	const transporter = nodemailer.createTransport({
		service: "Outlook365",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	transporter.sendMail({
		from: "Job Seeking Sy <jobseekingsy@outlook.com>",
		to: email,
		subject: "Activation Code",
		text: `Your Activation Code : ${code}\nYour code will expire in 15 minutes`,
	});
};

export const EmailService = {
	sendActivationCodeToEmail,
};
