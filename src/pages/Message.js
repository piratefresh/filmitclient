import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { useFormik } from "formik";
import queryString from "query-string";
import { GET_CHANNEL } from "../graphql/queries";
import { GET_LOCAL_ME } from "../graphql/localQueries";
import { CREATE_MESSAGE_MUTATION } from "../graphql/mutations";
import { MainContainer } from "../components/container";

import { MessageBox } from "../components/chat/MessageBox";

function Message() {
  let { channelId } = useParams();
  let params = queryString.parse(useLocation().search);
  const [paramTalkTo, setParamTalkTo] = React.useState(params.talkto);
  const { error, data } = useQuery(GET_LOCAL_ME);
  const {
    loading: channelLoading,
    error: channelError,
    data: channelData
  } = useQuery(GET_CHANNEL, {
    variables: {
      channelId: parseInt(channelId, 10)
    }
  });

  if (channelLoading) return <div>loading..</div>;

  return (
    <MainContainer>
      <Header>
        <h2>{paramTalkTo}</h2>
      </Header>

      <div>
        {data && data.me && channelData
          ? channelData.getChannel.messages.map(message => (
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
