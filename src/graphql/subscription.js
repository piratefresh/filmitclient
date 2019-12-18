import gql from "graphql-tag";

export const POST_CREATED = gql`
  subscription {
    postCreated {
      post {
        id
        title
        text
        tags
        createdAt
        category
        postImage
        location
      }
    }
  }
`;
