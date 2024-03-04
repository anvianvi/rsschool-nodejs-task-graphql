import { GraphQLSchema } from 'graphql';
import { RootMutationType } from './root-mutation.js';
import { RootQueryType } from './root-query.js';

export const rootSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
