import React from "react";
import styled from "styled-components";
import StyledNavLink from "../link/StyledNavLink";
import { useQuery } from "@apollo/react-hooks";
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
  const { loading, error, data, subscribeToMore } = useQuery(GET_ME);
  const [counter, setCounter] = React.useState();

  // gets message notifications
  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const oldUnreadMessages = prev.me.unreadMessages;
        const { messageCreated } = subscriptionData.data;

        // Merge conversations
        const mergeConversations = [...oldUnreadMessages, messageCreated];

        const me = prev.me;
        me.unreadMessages = mergeConversations;
        setCounter(me.unreadMessages.length);
        console.log(me);

        return { me };
      }
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  if (loading) return <div>loading notify..</div>;
  if (error) return console.log(error);
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
          {data && data.me && data.me.unreadMessages.length > 0 ? (
            <div className="notification-counter">
              {data.me.unreadMessages.length}
            </div>
          ) : null}
        </StyledNavLink>
        {data && data.me ? (
          <StyledNavLink to="/account" my={2}>
            <img
              src={
                data.me.avatar
                  ? data.me.avatar
                  : `http://localhost:8000/myAvatars/${data.me.id}`
              }
              alt={`Avatar for ${data.me.email}`}
            />
            <div>{data.me.username}</div>
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
