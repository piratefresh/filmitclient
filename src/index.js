import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Normalize } from "styled-normalize";
import * as serviceWorker from "./serviceWorker";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { ApolloProvider } from "@apollo/react-hooks";
import { signOut } from "./components/SignOut";
import { getAccessToken, setAccessToken } from "./accessToken";
import jwtDecode from "jwt-decode";
import { access } from "fs";

// Create apollo client
const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
  credentials: "include"
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const accessToken = getAccessToken();
    console.log("GETTING ACCESSTOKEN" + accessToken);
    if (accessToken) {
      headers = {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : ""
      };
    }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(message, locations, path);

      if (message === "UNAUTHENTICATED") {
        signOut(client);
      }
    });
  }

  if (networkError) {
    console.log("Network error", networkError);

    if (networkError.statusCode === 401) {
      signOut(client);
    }
  }
});

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:3000/refresh_token", {
      method: "POST",
      credentials: "include"
    });
  },
  handleFetch: accessToken => {
    console.log("HANDLE FETCH" + accessToken);
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  }
});

const link = ApolloLink.from([tokenRefreshLink, authLink, errorLink, httpLink]);
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const Root = () => (
  <ApolloProvider client={client}>
    <Normalize />
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector("#root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
