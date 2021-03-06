import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../../graphql/queries";

import StyledNavLink from "./StyledNavLink";
import Grid from "../../icons/Grid";
import Users from "../../icons/Users";
import Messages from "../../icons/Messages";
import Estimate from "../../icons/Estimate";
import { LogoutBtn } from "../buttons/Logout";

export function Nav() {
  const { loading, error, data } = useQuery(GET_ME);
  let body = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = (
      <Link to="/account" className="user-info-content">
        <img
          src={`http://localhost:8000/myAvatars/${data.me.id}`}
          alt={`Avatar for ${data.me.email}`}
        />
        <span>{data.me.email}</span>
      </Link>
    );
  } else {
    body = <Link to="/login">Sign In</Link>;
  }
  return (
    <NavStyled>
      <div className="site-title">
        <h2>Film-IT</h2>
      </div>

      <ul>
        <Link to="/">
          <NavLink my={2}>
            <Grid stroke="#212121" />
            <span>Feed</span>
          </NavLink>
        </Link>
        <Link to="/feed">
          <NavLink my={2}>
            <Users stroke="#212121" />
            <span>Users</span>
          </NavLink>
        </Link>
        <Link>
          <NavLink my={2}>
            <Messages stroke="#212121" />
            <span>Messages</span>
          </NavLink>
        </Link>
        <Link>
          <NavLink my={2}>
            <Estimate stroke="#212121" />
            <span>Estimate</span>
          </NavLink>
        </Link>
      </ul>
      <div className="user-info">
        {body}
        {data && data.me && <LogoutBtn />}
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  width: 150px;
  background-color: ${props => props.theme.colors.white};
  color: #212121;
  border-left: 1px solid #212121;
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4em 0;
    padding: 0;
  }
  a {
    text-decoration: none !important;
  }
  .site-title {
  }
  .user-info {
    font-size: 0.8rem;
    .user-info-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      img {
        width: 60px;
        height: 60px;
        border-radius: 30%;
        margin-bottom: 1em;
      }
    }
  }
`;

const NavLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #212121;
  padding: 20px;
  ${space};
  svg {
    margin-bottom: 5px;
  }
`;
