import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { RandomServiceClient as _randomPackage_RandomServiceClient, RandomServiceDefinition as _randomPackage_RandomServiceDefinition } from './randomPackage/RandomService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  randomPackage: {
    PingRequest: MessageTypeDefinition
    PongResponse: MessageTypeDefinition
    RandomNumberRequest: MessageTypeDefinition
    RandomNumberResponse: MessageTypeDefinition
    RandomService: SubtypeConstructor<typeof grpc.Client, _randomPackage_RandomServiceClient> & { service: _randomPackage_RandomServiceDefinition }
    TodoRequest: MessageTypeDefinition
    TodoResponse: MessageTypeDefinition
  }
}

