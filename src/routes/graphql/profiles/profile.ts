import DataLoader from 'dataloader';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLResolveInfo,
} from 'graphql';
import { MemberType } from '../member-types/member.js';
import { Context } from '../types/context.js';
import { MemberTypeId } from '../types/member-id-enum.js';
import { UUIDType } from '../types/uuid.js';

const profileTypeFields = {
  id: { type: UUIDType },
  isMale: { type: GraphQLBoolean },
  yearOfBirth: { type: GraphQLInt },
  userId: { type: UUIDType },
  memberTypeId: { type: MemberTypeId },
  memberType: {
    type: MemberType,
    async resolve(
      root: { memberTypeId: string },
      args,
      context: Context,
      info: GraphQLResolveInfo,
    ) {
      const { prisma, loaders } = context;

      let loader = loaders.get(info.fieldNodes);

      if (!loader) {
        loader = new DataLoader(async (keys: readonly string[]) => {
          const members = await prisma.memberType.findMany({
            where: {
              id: {
                in: keys as string[],
              },
            },
          });

          const result = keys.map((key: string) =>
            members.find((member) => member.id === key),
          );

          return result;
        });

        loaders.set(info.fieldNodes, loader);
      }

      const post = loader.load(root.memberTypeId);

      return post;
    },
  },
};

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    ...profileTypeFields,
  }),
});
