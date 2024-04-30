import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {ProtoGrpcType} from "./proto/generated/random";

const ADDRESS = '0.0.0.0';
const PORT = 5051;
const PROTO_FILE = './proto/random.proto'

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

const client = new grpcObject.randomPackage.RandomService(
    `${ADDRESS}:${PORT}`,
    grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    onClientReady();
    }
);

function onClientReady() {

    // client.Ping({message: "Ping"}, (err, res) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log(res);
    // });

    // ------------------------

    const stream = client.RandomNumberGenerator({min: 1, max: 100});
    stream.on('data', (data) => {
        console.log(data);
    });

    stream.on('end', () => {
        console.log('Stream ended');
    });

    // ------------------------

    // const stream = client.todoList();
    //
    // stream.write({task: "Task 1", status: "Pending"});
    // stream.write({task: "Task 2", status: "Pending"});
    // stream.write({task: "Task 3", status: "Pending"});
    // stream.write({task: "Task 4", status: "Pending"});
    // stream.write({task: "Task 5", status: "Pending"});
    // stream.end();

}


