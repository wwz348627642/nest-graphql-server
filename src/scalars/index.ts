import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb';

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo 主键',
  serialize(value: string): string {
    return value;
  },
  parseValue(value: unknown): ObjectId {
    if (typeof value !== 'string') {
      throw new Error('不能解析ObjectId2');
    }
    return new ObjectId(value);
  },
  parseLiteral(ast): ObjectId {
    // check the type of received value
    if (ast.kind !== Kind.STRING) {
      throw new Error('不能解析ObjectId3');
    }
    return new ObjectId(ast.value);
  },
});
