const PROTO_PATH = __dirname + '/task.proto';
const assert = require('assert');
const _ = require('lodash');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const taskPackage = grpcObject.taskPackage;

let tasks = [

    {
        title: 'Spanning Tree Protocol',
        description: 'Learn the fundamentals of the Spanning Tree Protocol and its role in network redundancy and loop prevention.',
        status: "DONE"
    },
    {
        title: 'EIGRP and OSPF Protocols - Analysis and Comparison',
        description: 'Conduct a detailed analysis and comparison of the EIGRP and OSPF routing protocols, exploring their features, advantages, and use cases.',
        status: "IN_PROGRESS"
    },
    {
        title: 'L3 Switches. Routing between VLANs. NAT and PAT Address Translation',
        description: 'Explore the functionality of Layer 3 switches and delve into routing between VLANs, as well as the concepts of Network Address Translation (NAT) and Port Address Translation (PAT).',
        status: "OPEN"
    }
]

function getServer() {

  const server = new grpc.Server();
  server.addService(taskPackage.TaskService.service, {

      CreateTask: (call, callback) => {

          const { task } = call.request;
          if (tasks.find(t => t.title === task.title)) return
          tasks.push(task);

          const message = `Task created with title: ${task.title}. Total tasks: ${tasks.length}`;
          console.log(message);
          callback(null, { message })

      },

      EditTask: (call, callback) => {

          const { title, status } = call.request;
          const task = tasks.find(t => t.title === title);

          if(!task){
              const message = `Task with title: ${title} not found.`;
              callback(null, { message });
              return
          }

          task.status = status;
          const message = `Task updated with title: ${title}. New status: ${status}.`;
          console.log(message);
          callback(null, { message })

      },

      DeleteTask: (call, callback) => {

          const { title } = call.request;
          const task = tasks.find(t => t.title === title);

          if(!task){
              const message = `Task with title: ${title} not found.`;
              callback(null, { message });
              return
          }

          tasks = [...tasks.filter(t => t.title !== title)]
          const message = `Task deleted with title: ${title}. Total tasks: ${tasks.length}`;
          console.log(message);
          callback(null, { message })

      },

      GetAllTasks: (call) => {

          console.log('Request for all tasks, starting stream...')

          let idx = 0;
          const interval = setInterval(() => {

              if (idx < tasks.length) {

                  call.write(tasks[idx]);
                  idx++;

              } else {

                  clearInterval(interval);
                  call.end();
                  console.log('All tasks streamed successfully.')

              }
          }, 300);
      }
  })
  return server;
}

if (require.main === module) {
  const server = getServer();
  server.bindAsync(
    '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
      assert.ifError(err);
      server.start();
  });
  console.log('Server running at http://localhost:9090');
}

exports.getServer = getServer;
