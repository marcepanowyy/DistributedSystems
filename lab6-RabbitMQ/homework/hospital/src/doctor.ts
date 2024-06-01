import amqplib, { Channel, Connection } from 'amqplib';
import { MessageContentI } from "./config/interface";
import { config } from "./config/config";
import readline from 'readline';

const exchange = 'technician-exchange';
const examinations = config.examinations.map(examination => examination.name);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

class Doctor {

    name: string;
    channel: Channel;

    constructor(name: string, channel: Channel) {
        this.name = name;
        this.channel = channel;
    }

    greet() {
        console.log(`${'-'.repeat(40)}`)
        console.log(`[${new Date().toLocaleString()}]`)
        console.log(`Hello! My name is \x1b[35m${this.name}\x1b[0m`);
        console.log(`I can refer patients to a technician for \x1b[34m${examinations.join('\x1b[0m, \x1b[34m')} \x1b[0mexaminations`);
        console.log(`I can also receive messages from \x1b[35mtechnicians\x1b[0m`);
        console.log(`${'-'.repeat(40)}`)
    }

    publishMessage(examination: string, patient: string) {
        const message: MessageContentI = {
            sender: this.name,
            patient,
            examination,
            time: new Date().toLocaleString()
        };

        this.channel.publish(exchange, `${examination}`, Buffer.from(JSON.stringify(message)));
        console.log(`Doctor \x1b[35m${this.name}\x1b[0m referred \x1b[32${patient}\x1b[0m for \x1b[34m${examination}\x1b[0m examination`);
        console.log(`Waiting for a \x1b[35mtechnician\x1b[0m to examine the patient...`);
        console.log(`${'-'.repeat(40)}`)
    }

    async receiveAdminMessage() {

        await this.channel.consume(`admin-${this.name}-queue`, async (message) => {

            if (message) {
                const messageContent: MessageContentI = JSON.parse(message.content.toString());
                this.channel.ack(message);
                this.printReceivedAdminMessageInfo(messageContent)
            }
        });
    }

    async receiveTechnicianMessage() {

        await this.channel.consume(`${this.name}-queue`, async (message) => {

                if (message) {
                    const messageContent: MessageContentI = JSON.parse(message.content.toString());
                    this.channel.ack(message);
                    this.printReceivedTechnicianMessageInfo(messageContent);
                }
            }
                )

        }

    printReceivedTechnicianMessageInfo(messageContent: MessageContentI) {

        console.log(`\n${'-'.repeat(40)}`)
        console.log(`[${new Date().toLocaleString()}]`)
        console.log(`Received message from \x1b[35m${messageContent.sender}\x1b[0m`);
        console.log(`Examination date: \x1b[33m${messageContent.time}\x1b[0m`);
        console.log(`Patient: \x1b[32m${messageContent.patient}\x1b[0m`)
        console.log(`Successfully examined \x1b[34m${messageContent.examination}\x1b[0m`);
        console.log(`${'-'.repeat(40)}`)
        rl.prompt()

    }

    printReceivedAdminMessageInfo(messageContent: MessageContentI) {

        console.log(`\n${'-'.repeat(40)}`)
        console.log(`[${new Date().toLocaleString()}]`)
        console.log(`Received message from \x1b[31m${messageContent.sender}\x1b[0m`);
        console.log(`Message: \x1b[31m${messageContent.adminMessage}\x1b[0m`);
        console.log(`${'-'.repeat(40)}`)
        rl.prompt()

    }

}

async function readFromConsole(doctor: Doctor) {

    function askExamination(patient: string) {
        rl.question('Enter examination type or type "exit" to quit: ', async (input) => {

            const examination = input.trim().toLowerCase();

            if (examination === '' || !examination) {
                rl.prompt();
                return;
            }

            if (!examinations.includes(examination)) {
                console.log('Invalid examination type');
                console.log(`${'-'.repeat(40)}`)
                askExamination(patient);
                return;
            }

            await doctor.publishMessage(examination, patient);
            askPatient();

        });
    }

    function askPatient() {
        rl.question('Enter patient name: ', (input) => {
            const patient = input.trim()
            if (patient === '' || !patient) {
                askPatient();
                return;
            }
            askExamination(patient);
        });
    }

    askPatient();

}

async function main() {

    const connection: Connection = await amqplib.connect('amqp://localhost');
    const channel: Channel = await connection.createChannel();

    const args = process.argv.slice(2);
    const name = args[0];

    if (!config.doctors.includes(name)) {
        console.log('Invalid doctor name');
        return;
    }

    const doctor = new Doctor(name, channel);
    doctor.greet();

    await doctor.receiveAdminMessage();
    await doctor.receiveTechnicianMessage();
    await readFromConsole(doctor);

    // await channel.close();
    // await connection.close();

}

main().catch(console.error);
