import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { Link } from "react-router-dom";
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
        <Link to="/">
          <NavLink my={2}>
            <Home />
            <div>Home</div>
          </NavLink>
        </Link>
        <Link to="/feed">
          <NavLink my={2}>
            <Grid />
            <div>Feed</div>
          </NavLink>
        </Link>
        <Link to="/users">
          <NavLink my={2}>
            <Users />
            <div>Profiles</div>
          </NavLink>
        </Link>
        <Link to="/account">
          <NavLink my={2}>
            <Messages />
            <div>Messages</div>
          </NavLink>
        </Link>
        {data && data.me ? (
          <Link to="/account">
            <NavLink my={2}>
              <img
                src={`http://localhost:8000/myAvatars/${data.me.id}`}
                alt={`Avatar for ${data.me.email}`}
              />
              <div>{data.me.username}</div>
            </NavLink>
          </Link>
        ) : (
          <Link to="/login">
            <NavLink my={2}>
              <Login />
              Login
            </NavLink>
          </Link>
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
  color: ${props => props.theme.colors.dark};
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

const NavLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #212121;
  padding: 20px;
  font-size: ${props => props.theme.textSize.smaller};
  ${space};
  svg {
    margin-bottom: 5px;
    stroke: ${props => props.theme.colors.dark} !important;
  }
  img {
    width: 25px;
    height: 25px;
    border-radius: 30px;
  }
`;
