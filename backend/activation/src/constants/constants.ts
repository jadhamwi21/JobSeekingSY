export const Port = process.env.PORT || 8003;

export const rabbitMqUrl = `amqp://guest:guest@${
	process.env.rabbitmq_url as string
}:5672`;
