import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import styled from "styled-components";
import { useFormik } from "formik";
import queryString from "query-string";
import { GET_CHANNEL, GET_USER_CHANNELS } from "../graphql/queries";
import { GET_ME } from "../graphql/queries";
import {
  CHANNEL_UPDATED_SUBSCRIPTION,
  GET_CHANNEL_SUBSCRIPTION
} from "../graphql/subscription";
import {
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_SEEN
} from "../graphql/mutations";
import { MainContainer } from "../components/container";

import { MessageBox } from "../components/chat/MessageBox";

function Message() {
  let { channelId } = useParams();
  let params = queryString.parse(useLocation().search);
  const [paramTalkTo, setParamTalkTo] = React.useState(params.talkto);
  const [paramSenderId, setParamSenderId] = React.useState(params.userid);
  const { loading: meLoading, error: meError, data } = useQuery(GET_ME);
  const {
    loading: channelLoading,
    error: channelError,
    data: channelData,
    subscribeToMore
  } = useQuery(GET_CHANNEL, {
    variables: {
      channelId: parseInt(channelId, 10)
    },
    fetchPolicy: "network-only"
  });
  const client = useApolloClient();

  const updateMessageSeen = React.useCallback(async () => {
    try {
      await client.mutate({
        mutation: UPDATE_MESSAGE_SEEN,
        variables: {
          senderId: parseInt(paramSenderId, 10),
          channelId: parseInt(channelId, 10)
        },
        refetchQueries: () => [
          {
            query: GET_USER_CHANNELS
          },
          { query: GET_ME }
        ]
      });
      console.log("mutating");
    } catch (err) {
      console.log(err);
    }
  }, [client, channelId, paramSenderId]);

  // Updates chat with new message
  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: CHANNEL_UPDATED_SUBSCRIPTION,
      variables: {
        channelId: parseInt(channelId, 10)
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        updateMessageSeen();
        const { channelUpdated } = subscriptionData.data;

        return { channel: channelUpdated };
      }
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, channelId, updateMessageSeen]);

  React.useEffect(() => {
    updateMessageSeen();
  }, [paramSenderId, updateMessageSeen]);

  if (channelLoading) return <div>loading..</div>;

  return (
    <MainContainer>
      <Header>
        <h2>{paramTalkTo}</h2>
      </Header>

      <div>
        {channelData
          ? channelData.channel.messages.map(message => (
              <MessageBox
                key={message.id}
                message={message}
                userSent={message.receiverId.id == data.me.id}
              />
            ))
          : null}
      </div>
    </MainContainer>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

export default Message;
