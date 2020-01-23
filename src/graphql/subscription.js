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
        location
        category
        postImage
        user {
          id
          firstName
          lastName
          username
          email
        }
      }
    }
  }
`;

export const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription messageCreated($receiverId: Int) {
    messageCreated(receiverId: $receiverId) {
      message {
        id
        content
        isRead
        channelId
        senderId {
          username
        }
        receiverId {
          username
        }
      }
    }
  }
`;

export const CHANNEL_UPDATED_SUBSCRIPTION = gql`
  subscription channelUpdated($memberId: Int) {
    channelUpdated(memberId: $memberId) {
      channel {
        id
        members
      }
    }
  }
`;
