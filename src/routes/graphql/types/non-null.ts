import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { ChangePostInputType, CreatePostInputType } from '../posts/input-post.js';
import { PostType } from '../posts/post.js';
import {
  ChangeProfileInputType,
  CreateProfileInputType,
} from '../profiles/input-profile.js';
import { ChangeUserInputType, CreateUserInputType } from '../users/input-user.js';
import { MemberTypeId } from './member-id-enum.js';

import { UUIDType } from './uuid.js';

export const UUIDNonNullType = new GraphQLNonNull(UUIDType);
export const PostNonNullType = new GraphQLNonNull(PostType);
export const MemberIdNonNullType = new GraphQLNonNull(MemberTypeId);

export const CreatePostInputNonNullType = new GraphQLNonNull(CreatePostInputType);
export const ChangePostInputNonNullType = new GraphQLNonNull(ChangePostInputType);

export const CreateProfileInputNonNullType = new GraphQLNonNull(CreateProfileInputType);
export const ChangeProfileInputNonNullType = new GraphQLNonNull(ChangeProfileInputType);

export const CreateUserInputNonNullType = new GraphQLNonNull(CreateUserInputType);
export const ChangeUserInputNonNullType = new GraphQLNonNull(ChangeUserInputType);

export const StringNonNullType = new GraphQLNonNull(GraphQLString);
export const BooleanNonNullType = new GraphQLNonNull(GraphQLBoolean);
export const IntNonNullType = new GraphQLNonNull(GraphQLInt);
export const FloatNonNullType = new GraphQLNonNull(GraphQLFloat);
