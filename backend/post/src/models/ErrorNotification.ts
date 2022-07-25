export class ErrorNotification extends Error {
	status!: number;
	description!: string;

	constructor(
		message: string = "Error",
		status: number = 500,
		description: string
	) {
		super(message);
		this.status = status;
		this.description = description;
	}
}
