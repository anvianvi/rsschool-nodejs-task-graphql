import { GraphQLScalarType, Kind } from 'graphql';

const isUUID = (value: unknown): value is string =>
  typeof value === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value);

const validateUUID = (value: unknown) => {
  if (!isUUID(value)) {
    throw new TypeError(`Invalid UUID.`);
  }
  return value;
};

export const UUIDType = new GraphQLScalarType({
  name: 'UUID',
  serialize: validateUUID,
  parseValue: validateUUID,
  parseLiteral: (ast) =>
    ast.kind === Kind.STRING && isUUID(ast.value) ? ast.value : undefined,
});
