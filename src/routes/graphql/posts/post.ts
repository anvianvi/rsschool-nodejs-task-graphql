import { GraphQLString, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';

const postTypeFields = {
  id: { type: UUIDType },
  title: { type: GraphQLString },
  content: { type: GraphQLString },
  authorId: { type: UUIDType },
};

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    ...postTypeFields,
  }),
});
