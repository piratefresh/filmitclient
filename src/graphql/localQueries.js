import gql from "graphql-tag";

export const GET_LOCAL_ME = gql`
  {
    me @client {
      id
      username
      role
      avatar
      firstName
      lastName
      unreadMessages {
        id
        content
        isRead
        channelId
        receiverId {
          id
          username
        }
        senderId {
          id
          username
        }
      }
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
