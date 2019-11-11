import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
import styled, { createGlobalStyle } from "styled-components";
import { AppRoute } from "./AppRoute";
import MainLayout from "./components/layouts/MainLayout";
import LoginLayout from "./components/layouts/LoginLayout";
import withSession from "./session/withSession";

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
          {/* <AppRoute component={NotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default withSession(App);
