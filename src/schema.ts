import { makeExecutableSchema } from "@graphql-tools/schema";
import type { GraphQLContext } from "./context";

const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
    userList: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    editUser(id: ID!, name: String!, email: String!, password: String!): User!
    deleteUser(id: ID!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    userList: async (parent: unknown, args: {}, context: GraphQLContext) => {
      return context.prisma.user.findMany();
    },
  },

  Mutation: {
    async createUser(
      parent: unknown,
      args: { name: string; email: string; password: string },
      context: GraphQLContext
    ) {
      const newLink = await context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      });
      return newLink;
    },
    async editUser(
      parent: unknown,
      args: { id: string; name: string; email: string; password: string },
      context: GraphQLContext
    ) {
      const newLink = await context.prisma.user.update({
        where: {
          id: parseInt(args.id),
        },
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      });
      return newLink;
    },
    async deleteUser(
      parent: unknown,
      args: { id: string },
      context: GraphQLContext
    ) {
      const newLink = await context.prisma.user.delete({
        where: {
          id: parseInt(args.id),
        },
      });
      return newLink;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
