import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';
import { MemberTypeId } from '../types/member-id-enum.js';

import {
  BooleanNonNullType,
  IntNonNullType,
  MemberIdNonNullType,
  UUIDNonNullType,
} from '../types/non-null.js';

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: BooleanNonNullType },
    yearOfBirth: { type: IntNonNullType },
    memberTypeId: { type: MemberIdNonNullType },
    userId: { type: UUIDNonNullType },
  }),
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  }),
});
