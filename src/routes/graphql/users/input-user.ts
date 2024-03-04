import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from 'graphql';
import { FloatNonNullType, StringNonNullType } from '../types/non-null.js';

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: StringNonNullType },
    balance: { type: FloatNonNullType },
  }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
