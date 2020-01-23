import React from "react";
import styled from "styled-components";
import { Avatar } from "../avatar";

export const MessageBox = ({ message, userSent }) => (
  <MessageContainer>
    <div className={userSent ? "receiverContainer box" : "senderContainer box"}>
      {userSent ? (
        <Avatar
          src={
            message.senderId.avatar
              ? message.senderId.avatar
              : `http://localhost:8000/myAvatars/${message.senderId.id}`
          }
        />
      ) : null}

      <div className="message-content">{message.content}</div>
    </div>
  </MessageContainer>
);

const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
  .box {
    display: flex;
  }
  .message-content {
    flex-direction: row;
    color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.primary};
    padding: 0.5rem;
    border-radius: 20px;
    margin-left: 1rem;
  }
  .senderContainer {
    margin-left: auto;
    .message-content {
      background-color: ${props => props.theme.colors.primary};
    }
  }
  .receiverContainer {
    .message-content {
      border: 1px solid ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.dark};
      background-color: ${props => props.theme.colors.white};
    }
  }
`;
