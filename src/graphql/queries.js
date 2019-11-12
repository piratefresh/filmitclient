import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      id
      username
      email
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
