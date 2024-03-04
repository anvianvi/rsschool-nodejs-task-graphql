import { GraphQLList } from 'graphql';
import { UserType } from './user.js';

export const UserListType = new GraphQLList(UserType);
