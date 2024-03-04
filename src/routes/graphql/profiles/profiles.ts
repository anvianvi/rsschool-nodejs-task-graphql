import { GraphQLList } from 'graphql';
import { ProfileType } from './profile.js';

export const ProfileListType = new GraphQLList(ProfileType);
