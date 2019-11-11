import React from "react";
import { ApolloConsumer } from "react-apollo";

import history from "../../history";

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => signOut(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
);

const signOut = client => {
  localStorage.removeItem("token");
  client.resetStore();
  history.push("/login");
};

export { signOut };

export default SignOutButton;
