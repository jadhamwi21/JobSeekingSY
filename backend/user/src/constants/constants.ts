export const Port = process.env.PORT || 8001;
export const rabbitMqUrl = `amqp://guest:guest@${process.env.rabbitmq_url}:5672`;
