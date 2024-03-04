import { GraphQLObjectType } from 'graphql';
import DataLoader from 'dataloader';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { MemberType } from './member-types/member.js';
import { MemberListType } from './member-types/members.js';
import { PostType } from './posts/post.js';
import { PostListType } from './posts/posts.js';
import { ProfileType } from './profiles/profile.js';
import { ProfileListType } from './profiles/profiles.js';
import { Context } from './types/context.js';
import { MemberIdNonNullType, UUIDNonNullType } from './types/non-null.js';
import { UserType } from './users/user.js';
import { UserListType } from './users/users.js';


export const RootQueryType = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    users: {
      type: UserListType,
      async resolve(_root, _args, context: Context, info) {
        const { prisma, loaders } = context;
        let loader = loaders.get(info.fieldNodes);
        const parsedResolveInfoFragment = parseResolveInfo(info);
        const { fields } = simplifyParsedResolveInfoFragmentWithType(
          parsedResolveInfoFragment as ResolveTree,
          UserListType,
        );
        const fieldsKeys = Object.keys(fields) as readonly string[];
        if (!loader) {
          loader = new DataLoader(async (keys) => {
            const fieldsKeys = keys[0].split(',');
            const dataUsers = await prisma.user.findMany({
              include: {
                subscribedToUser: fieldsKeys.includes('subscribedToUser'),
                userSubscribedTo: fieldsKeys.includes('userSubscribedTo'),
              },
            });
            return [dataUsers];
          });
          loaders.set(fieldsKeys, loader);
        }
        const result = loader.load(fieldsKeys.join());
        context.dataUsers = fieldsKeys;
        return result;
      },
    },

    user: {
      type: UserType,
      args: { id: { type: UUIDNonNullType } },
      async resolve(_root, args: { id: string }, context: Context) {
        const { prisma } = context;
        const user = await prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
        return user;
      },
    },

    posts: {
      type: PostListType,
      args: {},
      resolve: async (_root, _args, context: Context) => {
        const { prisma } = context;
        const posts = await prisma.post.findMany();
        return posts;
      },
    },

    post: {
      type: PostType,
      args: { id: { type: UUIDNonNullType } },

      resolve: async (_root, args: { id: string }, context: Context) => {
        const { prisma } = context;

        const post = await prisma.post.findUnique({
          where: {
            id: args.id,
          },
        });
        return post;
      },
    },

    memberTypes: {
      type: MemberListType,
      async resolve(_root, _args, context: Context) {
        const { prisma } = context;
        return await prisma.memberType.findMany();
      },
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: MemberIdNonNullType },
      },
      async resolve(_root, args: { id: string }, context: Context) {
        const { prisma } = context;
        return await prisma.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },

    profiles: {
      type: ProfileListType,
      async resolve(_root, _args, context: Context) {
        const { prisma } = context;
        return await prisma.profile.findMany();
      },
    },

    profile: {
      type: ProfileType,
      args: {
        id: { type: UUIDNonNullType },
      },
      async resolve(_root, args: { id: string }, context: Context) {
        const { prisma } = context;
        const profile = await prisma.profile.findUnique({
          where: {
            id: args.id,
          },
        });
        return profile;
      },
    },
  }),
});
