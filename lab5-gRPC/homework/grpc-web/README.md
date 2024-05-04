// SOURCE
https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld

// CHECK IF PROTOC IS INSTALLED if not - install it
protoc

// INSTALL PROTOC-GEN-JS AND PROTOC-GEN-GRPC-WEB no plugin needed for them
npm install protoc-gen-js
npm install protoc-gen-grpc-web

// TO GENERATE PB FILES
protoc -I. task.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

// INSTALL DEPENDENCIES
npm install

// TO BUILD CLIENT
npx webpack ./client.js

// TO RUN (in IDE terminal)

docker run -d --name envoy-container -v ${PWD}/envoy.yaml:/etc/envoy/envoy.yaml:ro -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.22.0
npm run server

// then open index.html in browser
