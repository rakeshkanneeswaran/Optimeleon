import { Kafka } from 'kafkajs';

const broker = process.env.KAFKA_BROKER || 'localhost:9092';
const topic = process.env.KAFKA_TOPIC || 'optimelon-update';

const kafka = new Kafka({
    clientId: 'processKafka',
    brokers: [broker],
});

interface DataToUpdate {
    id: string;
    userId: string;
    name: string;
    script: string;
}

export async function createTopicIfNotExists() {
    const admin = kafka.admin();
    try {
        await admin.connect();
        const topics = await admin.listTopics();
        console.log("Topics:", topics);
        
        if (!topics.includes(topic)) {
            console.log(`Creating topic ${topic}`);
            await admin.createTopics({
                topics: [{
                    topic: topic,
                    numPartitions: 1,
                    replicationFactor: 1,
                }]
            });
            console.log(`Topic ${topic} created`);
        } else {
            console.log(`Topic ${topic} already exists`);
        }
    } catch (error) {
        console.error(`Error creating topic ${topic}:`, error);
    } finally {
        await admin.disconnect();
    }
}

export async function processDataUpdate(data: DataToUpdate) {
    const producer = kafka.producer();
    try {
        await createTopicIfNotExists();
        await producer.connect();

        await producer.send({
            topic: topic,
            messages: [{
                value: JSON.stringify(data),
            }],
        });

        console.log('Sent data to Kafka:', data);
    } catch (error) {
        console.error('Error processing data update:', error);
    } finally {
        await producer.disconnect();
    }
}
