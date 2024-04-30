// Original file: proto/random.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { PingRequest as _randomPackage_PingRequest, PingRequest__Output as _randomPackage_PingRequest__Output } from '../randomPackage/PingRequest';
import type { PongResponse as _randomPackage_PongResponse, PongResponse__Output as _randomPackage_PongResponse__Output } from '../randomPackage/PongResponse';
import type { RandomNumberRequest as _randomPackage_RandomNumberRequest, RandomNumberRequest__Output as _randomPackage_RandomNumberRequest__Output } from '../randomPackage/RandomNumberRequest';
import type { RandomNumberResponse as _randomPackage_RandomNumberResponse, RandomNumberResponse__Output as _randomPackage_RandomNumberResponse__Output } from '../randomPackage/RandomNumberResponse';
import type { TodoRequest as _randomPackage_TodoRequest, TodoRequest__Output as _randomPackage_TodoRequest__Output } from '../randomPackage/TodoRequest';
import type { TodoResponse as _randomPackage_TodoResponse, TodoResponse__Output as _randomPackage_TodoResponse__Output } from '../randomPackage/TodoResponse';

export interface RandomServiceClient extends grpc.Client {
  Ping(argument: _randomPackage_PingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_randomPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  Ping(argument: _randomPackage_PingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_randomPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  Ping(argument: _randomPackage_PingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_randomPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  Ping(argument: _randomPackage_PingRequest, callback: grpc.requestCallback<_randomPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _randomPackage_PingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_randomPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _randomPackage_PingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_randomPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _randomPackage_PingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_randomPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _randomPackage_PingRequest, callback: grpc.requestCallback<_randomPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  
  RandomNumberGenerator(argument: _randomPackage_RandomNumberRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_randomPackage_RandomNumberResponse__Output>;
  RandomNumberGenerator(argument: _randomPackage_RandomNumberRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_randomPackage_RandomNumberResponse__Output>;
  randomNumberGenerator(argument: _randomPackage_RandomNumberRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_randomPackage_RandomNumberResponse__Output>;
  randomNumberGenerator(argument: _randomPackage_RandomNumberRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_randomPackage_RandomNumberResponse__Output>;
  
  TodoList(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_randomPackage_TodoRequest, _randomPackage_TodoResponse__Output>;
  TodoList(options?: grpc.CallOptions): grpc.ClientDuplexStream<_randomPackage_TodoRequest, _randomPackage_TodoResponse__Output>;
  todoList(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_randomPackage_TodoRequest, _randomPackage_TodoResponse__Output>;
  todoList(options?: grpc.CallOptions): grpc.ClientDuplexStream<_randomPackage_TodoRequest, _randomPackage_TodoResponse__Output>;
  
}

export interface RandomServiceHandlers extends grpc.UntypedServiceImplementation {
  Ping: grpc.handleUnaryCall<_randomPackage_PingRequest__Output, _randomPackage_PongResponse>;
  
  RandomNumberGenerator: grpc.handleServerStreamingCall<_randomPackage_RandomNumberRequest__Output, _randomPackage_RandomNumberResponse>;
  
  TodoList: grpc.handleBidiStreamingCall<_randomPackage_TodoRequest__Output, _randomPackage_TodoResponse>;
  
}

export interface RandomServiceDefinition extends grpc.ServiceDefinition {
  Ping: MethodDefinition<_randomPackage_PingRequest, _randomPackage_PongResponse, _randomPackage_PingRequest__Output, _randomPackage_PongResponse__Output>
  RandomNumberGenerator: MethodDefinition<_randomPackage_RandomNumberRequest, _randomPackage_RandomNumberResponse, _randomPackage_RandomNumberRequest__Output, _randomPackage_RandomNumberResponse__Output>
  TodoList: MethodDefinition<_randomPackage_TodoRequest, _randomPackage_TodoResponse, _randomPackage_TodoRequest__Output, _randomPackage_TodoResponse__Output>
}
