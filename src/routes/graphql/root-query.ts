import { GraphQLObjectType } from 'graphql';

export const RootQueryType = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({}),
});
