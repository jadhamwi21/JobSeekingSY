import {
	DocumentType,
	getModelForClass,
	prop,
	ReturnModelType,
} from "@typegoose/typegoose";

class ActivationClass {
	@prop({ type: String, required: true })
	public username?: string;

	@prop({ type: Boolean, required: true })
	public isActivated?: boolean;

	@prop({ type: String, required: true })
	public email?: string;

	public static async findByUsername(
		this: ReturnModelType<typeof ActivationClass>,
		username: string
	) {
		const user = await this.findOne({ username });
		if (user) {
			return user;
		} else {
			return null;
		}
	}

	public async setActivated(
		this: DocumentType<ActivationClass>,
		activated: boolean
	) {
		this.isActivated = activated;
	}
}

export const ActivationModel = getModelForClass(ActivationClass, {
	schemaOptions: { collection: "activations" },
});
