import { GraphQLList } from 'graphql';
import { PostType } from './post.js';

export const PostListType = new GraphQLList(PostType);
