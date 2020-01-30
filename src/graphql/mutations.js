import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation signUp(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      accessToken
    }
  }
`;

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

export const CONFIRM_EMAIL_MUTATION = gql`
  mutation confirmEmail($email: String!, $emailConfirmToken: String!) {
    confirmEmail(email: $email, emailConfirmToken: $emailConfirmToken) {
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

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $id: ID!
    $username: String!
    $email: String!
    $homepage: String
    $bio: String
    $avatar: String
    $firstName: String
    $lastName: String
    $city: String
    $lat: Float
    $lon: Float
    $vimeo: String
    $youtube: String
    $linkedin: String
    $instagram: String
    $facebook: String
  ) {
    updateProfile(
      id: $id
      username: $username
      email: $email
      homepage: $homepage
      bio: $bio
      avatar: $avatar
      firstName: $firstName
      lastName: $lastName
      city: $city
      lat: $lat
      lon: $lon
      facebook: $facebook
      linkedin: $linkedin
      youtube: $youtube
      vimeo: $vimeo
      instagram: $instagram
    ) {
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
      lat
      lon
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

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $text: String!
    $title: String!
    $postImage: String!
    $city: String!
    $lon: Float!
    $lat: Float!
    $tags: [String!]
    $category: [String!]
  ) {
    createPost(
      title: $title
      text: $text
      postImage: $postImage
      tags: $tags
      category: $category
      city: $city
      lat: $lat
      lon: $lon
    ) {
      title
      text
      postImage
      category
      tags
      city
      lat
      lon
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($receiverId: String!, $content: String!) {
    createMessage(receiverId: $receiverId, content: $content) {
      content
      channelId
      receiverId {
        firstName
        lastName
        username
        id
      }
    }
  }
`;

export const CREATE_CHANNEL_MUTATION = gql`
  mutation createChannel($receiverId: Int, $content: String) {
    createChannel(receiverId: $receiverId, content: $content) {
      id
    }
  }
`;

export const UPDATE_MESSAGE_SEEN = gql`
  mutation updateMessageSeen($senderId: ID!, $channelId: ID!) {
    updateMessageSeen(senderId: $senderId, channelId: $channelId)
  }
`;
