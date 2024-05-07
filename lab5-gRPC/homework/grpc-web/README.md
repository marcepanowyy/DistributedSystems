#### Source
https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld

#### Check if proto is installed if not - install it
```
protoc
```

#### Install protoc-gen-js and protoc-gen-grpc-web (no extra plugin needed)

```
npm install protoc-gen-js
```
```
npm install protoc-gen-grpc-web
```

#### Generate pb files
```
protoc -I. task.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```

#### Install dependencies
```
npm install
```

#### Build client
```
npx webpack ./client.js
```

#### Run in IDE

```
docker run -d --name envoy-container -v ${PWD}/envoy.yaml:/etc/envoy/envoy.yaml:ro -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.22.0
```
```
npm run server
```

#### Open index.html in browser
