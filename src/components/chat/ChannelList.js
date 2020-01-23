import React from "react";
import StyledLink from "../link/StyledLink";
import styled from "styled-components";
import { Avatar } from "../avatar";

const ChannelList = ({ channels, me }) => {
  if (!channels) return <div>No channels found</div>;
  return (
    <Container>
      {channels.map(channel => {
        console.log(channel);
        return channel.messages.map((message, i) => {
          if (channel.messages.length - 1 === i) {
            return (
              <StyledLink
                key={channel.id}
                to={`message/t/${channel.id}?talkto=${message.senderId.firstName} ${message.senderId.lastName}`}
              >
                <ChannelContainer>
                  <Avatar src={message.receiverId.avatar} size="large" />
                  <div className="channel-preview-container">
                    <div className="channel-receiver-name">
                      {message.receiverId.firstName !== me.me.firstName
                        ? message.receiverId.firstName
                        : message.senderId.firstName}{" "}
                      {message.receiverId.lastName !== me.me.lastName
                        ? message.receiverId.lastName
                        : message.senderId.lastName}
                    </div>
                    <div className="channel-last-message">
                      {message.content}
                    </div>
                  </div>
                </ChannelContainer>
              </StyledLink>
            );
          }
        });
      })}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  color: ${props => props.theme.colors.dark};
  .channel-preview-container {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
`;

export default ChannelList;
