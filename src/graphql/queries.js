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
      avatar
      firstName
      lastName
      location
      instagram
      youtube
      facebook
      linkedin
      vimeo
      posts {
        id
        text
        title
        createdAt
        tags
        location
        category
        postImage
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      username
      firstName
      lastName
      avatar
    }
  }
`;

export const GET_QUERY_USERS = gql`
  query queryUsers($offset: Int, $cursor: String) {
    queryUsers(limit: 4, offset: $offset, cursor: $cursor) {
      edges {
        username
        email
        id
        bio
        avatar
        firstName
        lastName
        location
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
      email
      bio
      homepage
      role
      avatar
      firstName
      lastName
      location
      instagram
      youtube
      facebook
      linkedin
      vimeo
      posts {
        id
        text
        title
        createdAt
        tags
        location
        category
        postImage
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      text
      title
      createdAt
      tags
      location
      category
      postImage
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts($offset: Int, $cursor: String) {
    posts(limit: 4, offset: $offset, cursor: $cursor) {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
