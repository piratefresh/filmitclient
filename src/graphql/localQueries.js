import gql from "graphql-tag";

export const GET_LOCAL_ME = gql`
  {
    me @client {
      id
      username
      email
      bio
      role
      avatar
      firstName
      lastName
    }
  }
`;

export const GET_LOCAL_UNREAD_MESSAGES = gql`
  {
    getUnreadMessages @client {
      id
      channelId
      isRead
      content
      receiverId {
        username
      }
      senderId {
        username
      }
    }
  }
`;
