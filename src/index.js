import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Normalize } from "styled-normalize";
import * as serviceWorker from "./serviceWorker";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "@apollo/react-hooks";

// Create apollo client
const link = createUploadLink({ uri: "http://localhost:8000/graphql" });
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
