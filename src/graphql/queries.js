import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      id
      username
      email
      bio
      homepage
      role
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      username
    }
  }
`;

export const GET_POSTS = gql`
  {
    posts {
      edges {
        id
        text
        title
        createdAt
        tags
        location
        category
        postImage
        user {
          username
          email
        }
      }
    }
  }
`;
