import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberTypeId } from '../types/member-id-enum.js';

const memberTypeFields = {
  id: { type: MemberTypeId },
  discount: { type: GraphQLFloat },
  postsLimitPerMonth: { type: GraphQLInt },
};

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    ...memberTypeFields,
  }),
});
