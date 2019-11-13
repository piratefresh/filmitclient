import React from "react";
import styled from "styled-components";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { SIGNOUT_MUTATION } from "../../graphql/mutations";
import { setAccessToken } from "../../accessToken";

export const LogoutBtn = () => {
  const [signOut] = useMutation(SIGNOUT_MUTATION);
  const client = useApolloClient();
  return (
    <button
      onClick={async () => {
        await signOut();
        setAccessToken("");
        await client.resetStore();
      }}
    >
      Sign Out
    </button>
  );
};
