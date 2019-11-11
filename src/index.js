import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Normalize } from "styled-normalize";
import * as serviceWorker from "./serviceWorker";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { signOut } from "./components/SignOut";

// Create apollo client
const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
  credentials: "include"
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      headers = { ...headers, "x-token": token, "refresh-token": refreshToken };
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

const link = ApolloLink.from([authLink, errorLink, httpLink]);
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
