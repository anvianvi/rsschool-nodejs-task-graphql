import { GraphQLObjectType } from 'graphql';

export const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',

  fields: () => ({}),
});
