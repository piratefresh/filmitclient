import gql from "graphql-tag";

export const resolvers = {
  Mutation: {
    setPosts: (parent, { posts }, { cache }, info) => {
      cache.writeData({
        data: {
          posts
        }
      });

      return null;
    }
  }
};
