import amqplib, {Channel, Connection, Message} from "amqplib";
import { config } from "./config/config";
import readline from "readline";
import {MessageContentI} from "./config/interface";


const loggerQueues = ['technician-logger-queue', 'doctor-logger-queue'];
const adminExchange = 'admin-exchange';
const technicians = config.technicians;
const doctors = config.doctors;
const recipients = [...technicians, ...doctors, 'all'];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});


class Admin {

    name: string;
    channel: Channel;

    constructor(name: string, channel: Channel) {
        this.name = name;
        this.channel = channel;
    }

    greet() {
        console.log(`${'-'.repeat(40)}`)
        console.log(`[${new Date().toLocaleString()}]`)
        console.log(`Hello! My name is \x1b[36m${this.name}\x1b[0m`);
        console.log(`I can view logs of all technicians and doctors`);
        console.log(`I can also send messages to them`);
        console.log(`Available technicians: \x1b[35m${technicians.join('\x1b[0m, \x1b[35m')}\x1b[0m`);
        console.log(`Available doctors: \x1b[35m${doctors.join('\x1b[0m, \x1b[35m')}\x1b[0m`);
        console.log(`${'-'.repeat(40)}`)
    }

    async publishMessage(recipient: string, messageContent: MessageContentI){

        const routingKey = recipient === 'all' ? 'all' : recipient;
        this.channel.publish(adminExchange, routingKey, Buffer.from(JSON.stringify(messageContent)));
        this.printSentMessage(recipient);

    }

    printReceivedMessageInfo(messageContent: MessageContentI){
        console.log(`\n${'-'.repeat(40)}`)
        console.log(`[${new Date().toLocaleString()}]`)
        console.log(`Received copy message from \x1b[35m${messageContent.sender}\x1b[0m`);
        const formattedMessage = `Message: ${JSON.stringify(messageContent, null, 2)}`;
        console.log('\x1b[32m%s\x1b[0m', formattedMessage);
        console.log(`${'-'.repeat(40)}`)
    }

    printSentMessage(recipient: string){
        console.log(`Message sent to \x1b[35m${recipient}\x1b[0m`);
        console.log(`${'-'.repeat(40)}`)
    }

    async receiveMessage() {
        for (const queue of loggerQueues) {
            await this.channel.consume(queue, async (message: Message | null) => {

                if (message) {
                    const messageContent = JSON.parse(message.content.toString());
                    this.channel.ack(message);
                    this.printReceivedMessageInfo(messageContent);
                    await readFromConsole(this);
                }
            });
        }
    }
}

async function readFromConsole(admin: Admin) {

    function askRecipient() {
        rl.question('Enter doctor or technician name or "all" to send message to all: ', (input) => {
            const recipient = input.trim().toLowerCase();

            if (recipient === '' || !recipient) {
                askRecipient();
                return;
            }

            if (!recipients.includes(recipient)) {
                console.log('Invalid recipient name');
                console.log(`${'-'.repeat(40)}`)
                askRecipient();
                return;
            } else {
                askMessage(recipient);
            }
        });
    }

    function askMessage(recipient: string) {
        rl.question('Enter message: ', async (input) => {
            const messageContent = {
                sender: admin.name,
                time: new Date().toLocaleString(),
                adminMessage: input.trim()
            };
            await admin.publishMessage(recipient, messageContent);
            askRecipient();
        });
    }

    askRecipient();
}


async function main(){

    const connection: Connection = await amqplib.connect('amqp://localhost');
    const channel: Channel = await connection.createChannel();

    const args = process.argv.slice(2);
    const name = args[0];

    if (!config.admins.includes(name)) {
        console.log('Invalid admin name');
        return;
    }

    const admin = new Admin(name, channel);
    admin.greet();

    await admin.receiveMessage();
    await readFromConsole(admin);

    // await channel.close();
    // await connection.close();

}

main().catch(console.error);