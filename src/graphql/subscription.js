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

export const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription messageCreated($receiverId: Int!) {
    messageCreated(receiverId: $receiverId) {
      id
      content
      channelId
      senderId
      receiverId
    }
  }
`;
