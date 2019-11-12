import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
import styled, { createGlobalStyle } from "styled-components";
import { AppRoute } from "./AppRoute";
import MainLayout from "./components/layouts/MainLayout";
import LoginLayout from "./components/layouts/LoginLayout";
import withSession from "./session/withSession";
import { setAccessToken } from "./accessToken";
import Cookies from "js-cookie";
import { useMutation } from "@apollo/react-hooks";
import { SIGNIN_GOOGLE_MUTATION } from "./graphql/mutations";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F6F7F9;
  }
`;

function App() {
  const [loading, setLoading] = React.useState(true);
  const [authGoogle] = useMutation(SIGNIN_GOOGLE_MUTATION, {
    onCompleted({ authGoogle }) {
      if (authGoogle.data) {
        setAccessToken(authGoogle.data.accessToken);
      }
    }
  });

  const googleUser = Cookies.get("gtoken");
  console.log(googleUser);

  React.useEffect(() => {
    if (googleUser) {
      authGoogle({
        variables: { input: { accessToken: googleUser } }
      });
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:3000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      console.log(x);
      const { accessToken } = await x.json();
      console.log(accessToken);
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Home} layout={MainLayout} />
          <AppRoute
            exact
            path="/login"
            component={Login}
            layout={LoginLayout}
          />
          <AppRoute exact path="/feed" component={Feed} layout={MainLayout} />
          <AppRoute
            exact
            path="/account"
            component={Account}
            layout={MainLayout}
          />
          <AppRoute component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
