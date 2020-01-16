import React from "react";
import styled from "styled-components";
import { Avatar } from "../avatar";

const ChannelList = ({ channels, me }) => {
  if (!channels) return <div>No channels found</div>;
  return (
    <Container>
      {channels.map(channel => {
        return channel.messages.map((message, i) => {
          if (channel.messages.length - 1 === i) {
            return (
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
                  <div className="channel-last-message">{message.content}</div>
                </div>
              </ChannelContainer>
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
  .channel-preview-container {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
`;

export default ChannelList;
