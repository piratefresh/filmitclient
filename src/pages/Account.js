import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../graphql/queries";

import { withAuth } from "../session/withAuth";
import EmailIcon from "../icons/Email";
import PhoneIcon from "../icons/Phone";
import AtIcon from "../icons/At";
import Posts from "../components/list/Posts";

const AccountPage = props => {
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return <div>Loading...</div>;
  if (error) return console.log(error);
  return (
    <AccountContainer>
      <h1>Account Page</h1>
      <img
        className="user-picture"
        src={`http://localhost:8000/myAvatars/${data.me.id}`}
        alt={`Avatar for ${data.me.email}`}
      />
      <form action="">
        <div className="field">
          <div className="label-wrapper">
            <label>
              <AtIcon size={16} />
            </label>
            <span>Username:</span>
          </div>

          {data.me.username}
        </div>
        <div className="field">
          <div className="label-wrapper">
            <label>
              <EmailIcon size={16} />
            </label>
            <span>Email:</span>
          </div>

          {data.me.email}
        </div>
        <div className="field">
          <div className="label-wrapper">
            <label>
              <PhoneIcon size={16} />
            </label>
            <span>Phone:</span>
          </div>

          {data.me.email}
        </div>
      </form>
      <MyPostContainer>
        <h2>My Posts</h2>
        <Posts></Posts>
      </MyPostContainer>
    </AccountContainer>
  );
};

const AccountContainer = styled.div`
  padding: 5%;
  h1 {
    text-align: center;
  }
  .user-picture {
    height: 120px;
    margin-bottom: 5%;
  }

  .field {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 5%;
    label {
      display: inline-flex;
      background-color: ${props => props.theme.colors.primary};
      padding: 3px;
      margin-right: 5px;
      align-items: center;
      border-radius: 5px;
      svg {
        transform: scale(0.7);
      }
      span {
        color: ${props => props.theme.colors.white};
      }
    }
  }
`;

const MyPostContainer = styled.div``;

export default withAuth(data => data && data.me)(AccountPage);
