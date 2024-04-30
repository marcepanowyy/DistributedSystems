import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from "./proto/generated/random";
import { RandomServiceHandlers } from "./proto/generated/randomPackage/RandomService";
import {TodoResponse} from "./proto/generated/randomPackage/TodoResponse";

const ADDRESS = '0.0.0.0';
const PORT = 5051;
const PROTO_FILE = './proto/random.proto'

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;
const randomPackage = grpcObject.randomPackage;

const todoList: TodoResponse = { todos: [] };

function main() {

    const server = new grpc.Server();
    server.addService(randomPackage.RandomService.service, {

        Ping: (req, res) => {
            console.log(req.request)
            res(null, {message: "Pong"})
        },

        RandomNumberGenerator: (call) => {

            const {min = 0, max = 0} = call.request;
            console.log(`Generating random number between ${min} and ${max}`)

            let runCount = 0;

            const interval = setInterval(() => {

                runCount++;
                const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                call.write({number: randomNumber})

                if (runCount >= 10) {
                    clearInterval(interval);
                    call.end();
                }

            }, 500)
        },

        // TodoList: (call, callback) => {
        //     call.on('data', (chunk) => {
        //         todoList.todos?.push(chunk);
        //         console.log(chunk);
        //     });
        //     call.on('end', () => {
        //         callback(null, {todos: todoList.todos});
        //     });
        // },

    } as RandomServiceHandlers);

    server.bindAsync(`${ADDRESS}:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server running at http://localhost:${port}`);
        // server.start(); // deprecated
    });

}

main();







