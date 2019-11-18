import gql from "graphql-tag";

export const SIGNIN_MUTATION = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      accessToken
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const SIGNIN_GOOGLE_MUTATION = gql`
  mutation authGoogle($input: AuthInput!) {
    authGoogle(input: $input) {
      accessToken
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const SIGNOUT_MUTATION = gql`
  mutation signOut {
    signOut
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $id: ID!
    $username: String!
    $email: String!
    $homepage: String
    $bio: String
  ) {
    updateProfile(
      id: $id
      username: $username
      email: $email
      homepage: $homepage
      bio: $bio
    ) {
      id
      username
      email
      homepage
      bio
    }
  }
`;
