import { Kafka } from 'kafkajs';
import { PrismaClient } from '@prisma/client';

const broker = process.env.KAFKA_BROKER || 'localhost:9092';
const topic = process.env.KAFKA_TOPIC || 'optimelon-update';

const kafka = new Kafka({
    clientId: 'processKafkaConsumer',
    brokers: [broker],
});

const prismaClient = new PrismaClient();

async function main() {
    const consumer = kafka.consumer({ groupId: 'project-group' });

    try {
        await consumer.connect();
        await consumer.subscribe({ topic });

        console.log(`Subscribed to topic ${topic}`);

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Received message: ${message.value?.toString()}`);

                const data = JSON.parse(message.value?.toString() || '{}');

                if (data && data.id && data.userId) {
                    try {
                        // Perform the database update operation
                        await prismaClient.project.update({
                            where: {
                                id: data.id,
                                userId: data.userId,
                            },
                            data: {
                                name: data.name,
                                script: data.script,
                            },
                        });
                        console.log(`Updated project with ID ${data.id}`);
                    } catch (error) {
                        console.error(`Error updating project with ID ${data.id}:`, error);
                    }
                } else {
                    console.error('Invalid message format:', data);
                }
            },
        });
    } catch (error) {
        console.error('Error initializing Kafka consumer:', error);
    }
}

main().catch(console.error);
