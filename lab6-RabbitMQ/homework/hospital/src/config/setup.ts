import amqplib, { Channel, Connection } from 'amqplib';
import { config } from "./config";


async function setup() {

    const connection: Connection = await amqplib.connect('amqp://localhost');
    const channel: Channel = await connection.createChannel();

    // Create exchanges & queues & bind queues to exchanges

    for (const exchangeConfig of config.exchanges) {
        await channel.assertExchange(exchangeConfig.name, exchangeConfig.type);
        for (const queueConfig of exchangeConfig.queues) {
            await channel.assertQueue(queueConfig.name);
            for (const bindingKey of queueConfig.bindingKeys) {
                await channel.bindQueue(queueConfig.name, exchangeConfig.name, bindingKey);
            }
        }
    }

    console.log('Setup completed')
    await channel.close();
    await connection.close();

}

setup().catch(console.error);
