import React from "react";
import styled from "styled-components";
import StyledNavLink from "../link/StyledNavLink";
import { useQuery } from "@apollo/react-hooks";
import {
  GET_LOCAL_ME,
  GET_LOCAL_UNREAD_MESSAGES
} from "../../graphql/localQueries";
import { GET_UNREAD_MESSAGES, GET_ME } from "../../graphql/queries";
import {
  MESSAGE_CREATED_SUBSCRIPTION,
  CHANNEL_UPDATED_SUBSCRIPTION
} from "../../graphql/subscription";

import Grid from "../../icons/Grid";
import Users from "../../icons/Users";
import Home from "../../icons/Home";
import Messages from "../../icons/Messages";
import Login from "../../icons/Login";

export function MobileNav({ session }) {
  const { loading, error, data, subscribeToMore, client, refetch } = useQuery(
    GET_UNREAD_MESSAGES
  );

  React.useEffect(() => {
    const unsubscribeNewMessage = subscribeToMore({
      document: MESSAGE_CREATED_SUBSCRIPTION,
      variables: {
        receiverId: session && session.me ? parseInt(session.me.id, 10) : null
      },
      updateQuery: (previousResult, { subscriptionData }) => {
        const { getUnreadMessages } = client.readQuery({
          query: GET_LOCAL_UNREAD_MESSAGES
        });
        if (!subscriptionData.data) return previousResult;
        const { messageCreated } = subscriptionData.data;
        return {
          getUnreadMessages: [...getUnreadMessages, messageCreated.message]
        };
      }
    });
    const unsubscribeUpdateChannel = subscribeToMore({
      document: CHANNEL_UPDATED_SUBSCRIPTION,
      variables: {
        memberId: session && session.me ? parseInt(session.me.id, 10) : null
      },
      updateQuery: async (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) return previousResult;
        console.log("channel updated");
        const { getUnreadMessages } = await refetch();
        return getUnreadMessages === undefined ? null : getUnreadMessages;
      }
    });
    return function unsubscribe() {
      unsubscribeNewMessage();
      unsubscribeUpdateChannel();
    };
  }, [subscribeToMore, session]);

  if (loading) return <div>loading notify..</div>;

  return (
    <NavStyled>
      <ul>
        <StyledNavLink exact to="/" my={2}>
          <Home />
          <div>Home</div>
        </StyledNavLink>
        <StyledNavLink to="/feed" my={2}>
          <Grid />
          <div>Feed</div>
        </StyledNavLink>
        <StyledNavLink to="/users" my={2}>
          <Users />
          <div>Profiles</div>
        </StyledNavLink>
        <StyledNavLink to="/messages" my={2}>
          <Messages />
          <div>Messages</div>
          {data && data.getUnreadMessages.length > 0 ? (
            <div className="notification-counter">
              {data.getUnreadMessages.length}
            </div>
          ) : null}
        </StyledNavLink>
        {session && session.me ? (
          <StyledNavLink to="/account" my={2}>
            <img
              src={
                session.me.avatar
                  ? session.me.avatar
                  : `http://localhost:8000/myAvatars/${session.me.id}`
              }
              alt={`Avatar for ${session.me.email}`}
            />
            <div>{session.me.username}</div>
          </StyledNavLink>
        ) : (
          <StyledNavLink to="/login" my={2}>
            <Login />
            Login
          </StyledNavLink>
        )}
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 64px;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primaryLighter};
  ul {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 1em 0;
    padding: 0;
    width: 100%;
  }
  a {
    text-decoration: none !important;
  }
  .notification-counter {
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    background-color: red;
    color: #fff;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 1.2rem;
    height: 1.2rem;
  }
`;

// const { data: dataSub } = useSubscription(
//   MESSAGE_CREATED_SUBSCRIPTION,
//   {
//     variables: {
//       receiverId: data && data.me && parseInt(data.me.id, 10)
//     },
//     onSubscriptionData: ({
//       client,
//       subscriptionData: {
//         data: { messageCreated }
//       }
//     }) => {
//       const { notifications } = client.readQuery({
//         query: gql`
//           query ReadFragment($id: Int!) {
//             notifications @client {
//               id
//               channelId
//               content
//               receiverId {
//                 username
//               }
//               senderId {
//                 username
//               }
//             }
//           }
//         `
//       });
//       client.writeData({
//         data: { notifications: [...notifications, messageCreated.message] }
//       });
//     }
//   }
// );
