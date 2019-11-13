import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../../graphql/queries";

import Grid from "../../icons/Grid";
import Users from "../../icons/Users";
import Messages from "../../icons/Messages";
import Estimate from "../../icons/Estimate";

export function MobileNav() {
  return (
    <NavStyled>
      <ul>
        <Link to="/">
          <NavLink my={2}>
            <Grid stroke="#212121" />
          </NavLink>
        </Link>
        <Link to="/feed">
          <NavLink my={2}>
            <Users stroke="#212121" />
          </NavLink>
        </Link>
        <Link>
          <NavLink my={2}>
            <Messages stroke="#212121" />
          </NavLink>
        </Link>
        <Link>
          <NavLink my={2}>
            <Estimate stroke="#212121" />
          </NavLink>
        </Link>
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
  height: 75px;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  color: #212121;
  border-top: 1px solid #212121;
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
  ${space};
  svg {
    margin-bottom: 5px;
  }
`;
