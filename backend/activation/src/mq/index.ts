import amqp from "amqplib";
import { rabbitMqUrl } from "../constants/constants";

export const rabbitMqConnection = amqp.connect(rabbitMqUrl).then((conn) => {
	console.log("CONNECTED TO RABBITMQ ");
	return conn;
});
