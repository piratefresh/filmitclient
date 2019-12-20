import React from "react";
import styled from "styled-components";
import StyledNavLink from "../link/StyledNavLink";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../../graphql/queries";

import Grid from "../../icons/Grid";
import Users from "../../icons/Users";
import Home from "../../icons/Home";
import Messages from "../../icons/Messages";
import Login from "../../icons/Login";

export function MobileNav() {
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return <div>Loading...</div>;
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
        </StyledNavLink>
        {data && data.me ? (
          <StyledNavLink to="/account" my={2}>
            <img
              src={`http://localhost:8000/myAvatars/${data.me.id}`}
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
`;
