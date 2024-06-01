import amqplib, { Channel, Connection, Message } from "amqplib";
import { MessageContentI } from "./config/interface";
import { config } from "./config/config";


const doctorExchange = 'doctor-exchange';
const technicianQueuePattern = 'technician-x-queue';
const adminQueuePattern = 'admin-x-queue';


class Technician {

    name: string;
    examinations: string[];
    channel: Channel;
    queues: string[];

    constructor(name: string, examinations: string[], channel: Channel, queues: string[]) {
        this.name = name;
        this.examinations = examinations;
        this.channel = channel;
        this.queues = queues;
    }

    getMyExaminations() {
        return config.examinations
            .filter(examination => this.examinations.includes(examination.name));
    }

    greet() {

        console.log(`${'-'.repeat(40)}`)
        console.log(`[${new Date().toLocaleString()}]`)
        console.log(`Hello! My name is \x1b[35m${this.name}\x1b[0m`);
        const exams = this.getMyExaminations();
        const examsStr = exams.map(exam => `\x1b[34m${exam.name}\x1b[0m (${exam.duration / 1000} s)`).join(', ');
        console.log(`I am qualified to perform the following examinations: ${examsStr}`);
        console.log('After the test is completed, I will send the result to the referring doctor');
        console.log(`${'-'.repeat(40)}`)
    }

    async examine(messageContent: MessageContentI) {

        const { sender, examination } = messageContent;
        const delayTime = config.examinations
            .find(examination => examination.name === messageContent.examination)?.duration || 0;

        if(!examination){
            console.log('No examination type specified');
            return;
        }
        if (!config.doctors.includes(sender)) {
            console.log('Invalid doctor name');
            return;
        }
        if (!this.examinations.includes(examination)) {
            console.log('Technician is not qualified to perform this examination');
            return;
        }

        this.printReceivedDoctorMessageInfo(messageContent, delayTime)
        await this.delay(delayTime);
        console.log(`Examination of \x1b[34m${examination}\x1b[0m completed`);

    }

    printReceivedDoctorMessageInfo(messageContent: MessageContentI, delayTime: number){

        console.log(`[${new Date().toLocaleString()}]`)
        console.log(`Received examination from referral \x1b[35m${messageContent.sender}\x1b[0m`);
        console.log(`Referral date: \x1b[33m${messageContent.time}\x1b[0m`);
        console.log(`Patient: \x1b[32m${messageContent.patient}\x1b[0m`);
        console.log(`Conducting examination of \x1b[34m${messageContent.examination}\x1b[0m for ${delayTime / 1000}s`);
        console.log('Please wait...');
    }

    printSentDoctorMessageInfo(sender: string){
        console.log(`Result has been sent to referral \x1b[35m${sender}\x1b[0m`);
        console.log(`${'-'.repeat(40)}`)
    }

    publishMessage(messageContent: MessageContentI) {

        const { sender, examination, patient } = messageContent;

        const message: MessageContentI = {
            sender: this.name,
            patient,
            examination,
            time: new Date().toLocaleString()
        };

        this.channel.publish(doctorExchange, `${sender}`, Buffer.from(JSON.stringify(message)));
        this.printSentDoctorMessageInfo(sender);

    }

    printReceivedAdminMessageInfo(messageContent: MessageContentI){

        console.log(`[${new Date().toLocaleString()}]`)
        console.log(`Received message from \x1b[31m${messageContent.sender}\x1b[0m`);
        console.log(`Message: \x1b[31m${messageContent.adminMessage}\x1b[0m`);
        console.log(`${'-'.repeat(40)}`)

    }

    async receiveAdminMessage() {

        await this.channel.consume(
            adminQueuePattern.replace('x', this.name),
            async (message: Message | null) => {

                if (message) {
                    const messageContent: MessageContentI = JSON.parse(message.content.toString());
                    this.channel.ack(message);
                    this.printReceivedAdminMessageInfo(messageContent);
                }
            }
        )
    }

    async receiveDoctorMessage() {

        // Round-robin polling of queues
        while (true) {
            for (const queue of this.queues) {

                const message = await this.channel.get(queue, { noAck: false });

                if (message) {
                    const messageContent = JSON.parse(message.content.toString());

                    try {
                        await this.examine(messageContent);
                        this.publishMessage(messageContent);
                        this.channel.ack(message);

                    } catch (error) {
                        console.error('Error processing message:', error);
                        this.channel.nack(message, false, true);
                        return;
                    }
                }
            }
            // Prevent tight loop
            await this.delay(1000);
        }
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

async function main() {

    const connection: Connection = await amqplib.connect('amqp://localhost');
    const channel: Channel = await connection.createChannel();

    const args = process.argv.slice(2);
    const examinations = args.slice(1);
    const name = args[0];

    if (!config.technicians.includes(name)) {
        console.log('Invalid technician name');
        return;
    }

    if (examinations.length === 0 || config.examinations
        .filter(examination => examinations
            .includes(examination.name)).length === 0) {
        console.log('Invalid examination name');
        return;
    }

    const queues = examinations.map(examination => `${technicianQueuePattern.replace('x', examination)}`);

    const technician = new Technician(args[0], examinations, channel, queues);
    technician.greet();

    await technician.receiveAdminMessage();
    await technician.receiveDoctorMessage();

    // await channel.close();
    // await connection.close();

}

main().catch(console.error);

