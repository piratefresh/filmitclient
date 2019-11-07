import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import StyledNavLink from "./StyledNavLink";
import Feed from "../../icons/Feed";
import Users from "../../icons/Users";
import Messages from "../../icons/Messages";
import Estimate from "../../icons/Estimate";

export function Nav() {
  return (
    <NavStyled>
      <ul>
        <Link to="/">
          <NavLink my={4}>
            <Feed />
          </NavLink>
        </Link>
        <Link to="/feed">
          <NavLink my={4}>
            <Users />
          </NavLink>
        </Link>
        <Link>
          <NavLink my={4}>
            <Messages />
          </NavLink>
        </Link>
        <Link>
          <NavLink my={4}>
            <Estimate />
          </NavLink>
        </Link>
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 150px;
  background-color: #2b285c;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4em 0;
    padding: 0;
  }
`;

const NavLink = styled.div`
  ${space}
`;
