import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import StyledLink from "../link/StyledLink";
import { format } from "date-fns";
import useEventListener from "../hooks/useEventHandler";

const UserList = ({ users, onLoadMore }) => {
  const [fetch, setFetch] = React.useState(false);
  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handleOnScroll = React.useCallback(() => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      setFetch(true);
    } else {
      setFetch(false);
    }
  }, [setFetch]);
  useEventListener("scroll", handleOnScroll);

  React.useEffect(() => {
    if (fetch) onLoadMore();
  }, [fetch]);

  if (!users) return <div>No users</div>;
  if (users) console.log(users);
  return (
    <UsersContainer>
      {users.map((user, index) => {
        return (
          <User key={index}>
            <div className="user-header">
              <StyledLink to={`/user/${user.id}`}>
                <img
                  className="user-img"
                  src={
                    user.avatar
                      ? user.avatar
                      : `http://localhost:8000/myAvatars/${user.id}`
                  }
                />
              </StyledLink>

              <div className="header-content">
                <div className="user-title-container">
                  <StyledLink to={`/user/${user.id}`}>
                    <span className="user-title">{user.username}</span>
                  </StyledLink>

                  {user && user.firstName && user.lastName && (
                    <div className="user-name-container">
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  )}
                  {user && user.location && (
                    <div className="user-name-container">
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
                {/* <span className="user-location">{user.location}</span> */}
                {/* <span className="user-date">
                  {format(new Date(user.createdAt), "MMM dd")}
                </span> */}
              </div>
            </div>

            <span className="user-text">{user.bio}</span>
          </User>
        );
      })}
    </UsersContainer>
  );
};

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const User = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
  margin-bottom: 5%;
  padding: 5%;
  .user-header {
    display: flex;
    flex-direction: row;
  }
  .user-img {
    width: 80px;
    height: 70px;
    border-radius: 5px;
    object-fit: cover;
  }
  .header-content {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .user-title-container {
      display: grid;
      grid-auto-rows: repeat(1fr, 3);
      flex-direction: column;
      align-items: baseline;
      height: 100%;
      .user-title {
        font-weight: 600;
        font-size: 1.2rem;
        color: ${props => props.theme.colors.dark};
      }
      .user-name-container {
        font-size: 0.9rem;
        font-weight: 400;
        color: ${props => props.theme.colors.primaryLighter};
      }
    }
    .user-location {
      margin: 2% 0;
    }
    .user-date {
      font-size: 0.9rem;
      font-weight: 400;
      color: ${props => props.theme.colors.primaryLighter};
    }
  }
  .user-text {
    font-size: 0.9rem;
    font-weight: 400;
    margin: 2% 0;
    width: 24em;
    line-height: ${props => props.theme.text.normalLineHeight};
    color: ${props => props.theme.colors.primaryDarker};
    word-wrap: break-word;
    white-space: pre-line;
  }
`;

export default UserList;
