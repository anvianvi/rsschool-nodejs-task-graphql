import { GraphQLList } from 'graphql';
import { MemberType } from './member.js';

export const MemberListType = new GraphQLList(MemberType);
