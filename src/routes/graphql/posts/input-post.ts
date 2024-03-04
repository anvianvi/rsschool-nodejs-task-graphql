import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { StringNonNullType, UUIDNonNullType } from '../types/non-null.js';
import { UUIDType } from '../types/uuid.js';

export const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: { type: StringNonNullType },
    content: { type: StringNonNullType },
    authorId: { type: UUIDNonNullType },
  }),
});

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  }),
});
