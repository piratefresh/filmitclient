import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../../graphql/queries";

import Grid from "../../icons/Grid";
import Users from "../../icons/Users";
import Messages from "../../icons/Messages";

export function MobileNav() {
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return <div>Loading...</div>;
  if (error) return console.log(error);
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
        <Link to="/account">
          <NavLink my={2}>
            <Messages stroke="#212121" />
          </NavLink>
        </Link>
        <Link to="/account">
          <NavLink my={2}>
            {data && data.me ? (
              <img
                src={`http://localhost:8000/myAvatars/${data.me.id}`}
                alt={`Avatar for ${data.me.email}`}
              />
            ) : null}
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
  align-items: baseline;
  justify-content: center;
  color: #212121;
  padding: 20px;
  ${space};
  svg {
    margin-bottom: 5px;
  }
  img {
    width: 25px;
    height: 25px;
    border-radius: 30px;
  }
`;
