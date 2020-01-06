import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphql/queries";

import { Avatar } from "../components/avatar";
import { AddButton } from "../components/buttons/buttons";
import useModal from "../components/hooks/useModal";
import Modal from "../components/modal";
import { Input } from "../components/form/BasicInput";

function User() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id
    }
  });
  const { isShown, toggle } = useModal();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const { user } = data;
  return (
    <UserContainer>
      <img src={user.avatar} alt={`Header Image for ${user.title}`} />
      <div className="user-text-container">
        <div className="user-header">
          <h2 className="user-title">{user.title}</h2>
        </div>

        <div className="user-meta-details-container">
          <Avatar
            src={`http://localhost:8000/myAvatars/${user.id}`}
            alt={`Avatar for ${user.username}`}
            size="large"
          />
          <div className="user-meta-details">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>{user.email}</div>
            <span className="user-location">{user.location}</span>
          </div>
        </div>
        <AddButton onClick={toggle}>Message</AddButton>
        {isShown && (
          <Modal content="Test" buttonLabel="Message" toggle={toggle}>
            <h3>Send a message to {user.firstName}</h3>
            <Input name="content" type="textarea" />
            <AddButton>Message</AddButton>
          </Modal>
        )}

        <p className="user-text">{user.bio}</p>
      </div>
    </UserContainer>
  );
}

export default User;

const UserContainer = styled.div`
  .user-meta-details-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    color: ${props => props.theme.colors.primaryLighter};
    .user-meta-details {
      margin-left: 15px;
      line-height: ${props => props.theme.text.normalLineHeight};
      color: ${props => props.theme.colors.dark};
    }
  }
  img {
    width: 100%;
    max-height: 60vh;
    object-fit: cover;
  }
  .user-text-container {
    padding: 5%;
    margin: 5%;
    line-height: ${props => props.theme.text.wideLineHeight};
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primaryDarker};
    border-radius: 5px;
    .user-title {
      font-size: ${props => props.theme.textSize.headline};
      color: ${props => props.theme.colors.primary};
      margin: 0;
      padding: 0;
    }
    .user-location {
      margin-bottom: 2em;
    }
    .user-text {
      white-space: pre-line;
    }
  }
`;

const ModalSeperator = styled.div`
  color: ${props => props.theme.colors.primary};
  border-bottom: 1px solid ${props => props.theme.colors.primary};
  line-height: 2em;
  margin-top: 75px;
`;
