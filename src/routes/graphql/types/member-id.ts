import { GraphQLScalarType, Kind } from 'graphql';

export type MemberID = 'business' | 'basic';

const isMemberID = (value: unknown): value is MemberID =>
  value === 'business' || value === 'basic';

export const MemberType = new GraphQLScalarType({
  name: 'MemberTypeIdScalar',

  serialize(value) {
    if (!isMemberID(value)) {
      throw new TypeError(`Invalid MemberTypeId.`);
    }
    return value;
  },

  parseValue(value) {
    if (!isMemberID(value)) {
      throw new TypeError(`Invalid MemberTypeId.`);
    }
    return value;
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (isMemberID(ast.value)) {
        return ast.value;
      }
    }
    return undefined;
  },
});
