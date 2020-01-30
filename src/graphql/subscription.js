import gql from "graphql-tag";

export const POST_CREATED = gql`
  subscription {
    postCreated {
      post {
        id
        text
        title
        createdAt
        tags
        city
        category
        postImage
        firstName
        lastName
        username
      }
    }
  }
`;

export const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription messageCreated {
    messageCreated {
      id
      content
      isRead
      channelId
      senderId {
        id
        username
        firstName
        lastName
      }
      receiverId {
        id
        username
        firstName
        lastName
      }
    }
  }
`;

export const CHANNEL_NEW_SUBSCRIPTION = gql`
  subscription channelNew {
    channelNew {
      id
      createdAt
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
        senderId {
          id
          username
          firstName
          lastName
        }
        receiverId {
          id
          username
          firstName
          lastName
        }
      }
    }
  }
`;

export const CHANNEL_UPDATED_SUBSCRIPTION = gql`
  subscription channelUpdated {
    channelUpdated {
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
      createdAt
      messages {
        id
        isRead
        content
        channelId
        senderId {
          id
          username
          firstName
          lastName
          avatar
        }
        receiverId {
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

export const GET_CHANNEL_SUBSCRIPTION = gql`
  subscription getChannel($channelId: Int!) {
    getChannel(channelId: $channelId) {
      id
      createdAt
      receiverId {
        id
        username
      }
      senderId {
        id
        username
      }
      messages {
        id
        isRead
        content
        channelId
        senderId {
          id
          username
          firstName
          lastName
          avatar
        }
        receiverId {
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

/**
 * Get user's new conversation in real time
 */
// export const GET_NEW_CONVERSATIONS_SUBSCRIPTION = gql`
//   subscription {
//     newConversation {
//       id
//       username
//       fullName
//       image
//       isOnline
//       seen
//       lastMessage
//       lastMessageSender
//       lastMessageCreatedAt
//     }
//   }
// `;
