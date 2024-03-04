import { GraphQLObjectType } from 'graphql';
import { PostType } from './posts/post.js';
import { ProfileType } from './profiles/profile.js';
import { Context } from './types/context.js';
import {
  ChangePostInputNonNullType,
  ChangeProfileInputNonNullType,
  ChangeUserInputNonNullType,
  CreatePostInputNonNullType,
  CreateProfileInputNonNullType,
  CreateUserInputNonNullType,
  UUIDNonNullType,
} from './types/non-null.js';
import { Void } from './types/void.js';
import { UserType } from './users/user.js';
import {
  ChangePost,
  ChangeProfile,
  ChangeUser,
  CreatePost,
  CreateProfile,
  CreateUser,
  UserSubscribedTo,
} from './interface.js';

export const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',

  fields: () => ({
    createPost: {
      type: PostType,
      args: {
        dto: {
          type: CreatePostInputNonNullType,
        },
      },

      async resolve(_root, args: CreatePost, context: Context) {
        const { prisma } = context;
        const newPost = await prisma.post.create({
          data: args.dto,
        });
        return newPost;
      },
    },

    changePost: {
      type: PostType,
      args: {
        id: { type: UUIDNonNullType },
        dto: { type: ChangePostInputNonNullType },
      },

      async resolve(_root, { id, dto }: ChangePost, context: Context) {
        const { prisma } = context;
        const updatePost = prisma.post.update({
          where: { id },
          data: dto,
        });
        return updatePost;
      },
    },

    deletePost: {
      type: Void,
      args: {
        id: { type: UUIDNonNullType },
      },
      async resolve(_root, args: { id: string }, context: Context) {
        const { prisma } = context;
        await prisma.post.delete({
          where: {
            id: args.id,
          },
        });
      },
    },

    createProfile: {
      type: ProfileType,
      args: {
        dto: {
          type: CreateProfileInputNonNullType,
        },
      },
      async resolve(_root, args: CreateProfile, context: Context) {
        const { prisma } = context;
        const newProfile = await prisma.profile.create({
          data: args.dto,
        });
        return newProfile;
      },
    },

    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: UUIDNonNullType },
        dto: {
          type: ChangeProfileInputNonNullType,
        },
      },

      async resolve(_root, args: ChangeProfile, context: Context) {
        const { prisma } = context;
        const changeProfile = prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
        return changeProfile;
      },
    },

    deleteProfile: {
      type: Void,
      args: {
        id: { type: UUIDNonNullType },
      },
      async resolve(_root, args: { id: string }, context: Context) {
        const { prisma } = context;
        await prisma.profile.delete({
          where: {
            id: args.id,
          },
        });
      },
    },

    createUser: {
      type: UserType,
      args: {
        dto: {
          type: CreateUserInputNonNullType,
        },
      },
      async resolve(_root, args: CreateUser, context: Context) {
        const { prisma } = context;
        const newUser = await prisma.user.create({
          data: args.dto,
        });
        return newUser;
      },
    },

    changeUser: {
      type: UserType,
      args: {
        id: { type: UUIDNonNullType },
        dto: {
          type: ChangeUserInputNonNullType,
        },
      },

      async resolve(_root, args: ChangeUser, context: Context) {
        const { prisma } = context;
        const updateUser = prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
        return updateUser;
      },
    },

    deleteUser: {
      type: Void,
      args: {
        id: { type: UUIDNonNullType },
      },
      async resolve(_root, args: { id: string }, context: Context) {
        const { prisma } = context;
        await prisma.user.delete({
          where: {
            id: args.id,
          },
        });
      },
    },

    subscribeTo: {
      type: UserType,
      args: {
        userId: {
          type: UUIDNonNullType,
        },
        authorId: {
          type: UUIDNonNullType,
        },
      },
      async resolve(_root, args: UserSubscribedTo, context: Context) {
        const { prisma } = context;
        return await prisma.user.update({
          where: {
            id: args.userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: args.authorId,
              },
            },
          },
        });
      },
    },

    unsubscribeFrom: {
      type: Void,
      args: {
        userId: {
          type: UUIDNonNullType,
        },
        authorId: {
          type: UUIDNonNullType,
        },
      },
      async resolve(_root, args: UserSubscribedTo, context: Context) {
        const { prisma } = context;
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
      },
    },
  }),
});
