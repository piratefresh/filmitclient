import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      id
      username
      role
      email
      avatar
      bio
      city
      lat
      lon
      instagram
      youtube
      facebook
      linkedin
      vimeo
      firstName
      lastName
      posts {
        id
        text
        title
        createdAt
        tags
        city
        category
        postImage
      }
      unreadMessages {
        id
        content
        isRead
        channelId
        receiverId {
          id
          firstName
          lastName
          username
        }
        senderId {
          id
          firstName
          lastName
          username
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
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
      city
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
        city
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
        city
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
      city
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
        city
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
      city
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
        city
        category
        postImage
        username
        firstName
        lastName
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const SEARCH_POSTS = gql`
  query searchPosts(
    $term: String
    $category: [String]
    $lat: Float
    $lon: Float
    $offset: Int
    $cursor: String
  ) {
    searchPosts(
      term: $term
      category: $category
      lat: $lat
      lon: $lon
      limit: 4
      offset: $offset
      cursor: $cursor
    ) {
      edges {
        id
        text
        title
        createdAt
        tags
        city
        category
        postImage
        username
        firstName
        lastName
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const CATEGORY_POSTS = gql`
  query categoryPosts($query: String!) {
    categoryPosts(query: $query) {
      id
      title
      text
      username
      firstName
      lastName
      city
      tags
      category
      createdAt
      postImage
    }
  }
`;

export const GET_RECENT_POSTS = gql`
  query getRecentPosts {
    getRecentPosts {
      id
      title
      text
      username
      firstName
      lastName
      city
      tags
      category
      createdAt
      postImage
    }
  }
`;

export const GET_USER_CHANNELS = gql`
  query getUserChannels {
    getUserChannels {
      id
      receiverId {
        id
        firstName
        lastName
        username
      }
      senderId {
        id
        firstName
        lastName
        username
      }
      messages {
        id
        isRead
        content
        channelId
        receiverId {
          id
          username
          firstName
          lastName
          avatar
        }
        senderId {
          id
          username
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;

export const GET_UNREAD_MESSAGES = gql`
  query getUnreadMessages {
    getUnreadMessages {
      id
      isRead
      content
      channelId
      receiverId {
        id
        username
        firstName
        lastName
      }
      senderId {
        id
        username
        firstName
        lastName
      }
    }
  }
`;

export const GET_CHANNEL = gql`
  query channel($channelId: Int!) {
    channel(channelId: $channelId) {
      id
      messages {
        id
        content
        isRead
        channelId
        receiverId {
          id
          username
          firstName
          lastName
          avatar
        }
        senderId {
          id
          username
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;
