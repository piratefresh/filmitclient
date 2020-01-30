import React from "react";
import "./App.css";
import { Router, Switch } from "react-router-dom";
import history from "./history";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AppRoute } from "./AppRoute";
import MainLayout from "./components/layouts/MainLayout";
import LoginLayout from "./components/layouts/LoginLayout";
import { setAccessToken } from "./accessToken";
import Cookies from "js-cookie";
import { useMutation } from "@apollo/react-hooks";
import { SIGNIN_GOOGLE_MUTATION } from "./graphql/mutations";
import { GET_ME } from "./graphql/queries";
import { StateProvider } from "./contexts";

import { normalTheme } from "./components/theme";
import { PrivatRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import CreatePost from "./pages/createPost";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import Message from "./pages/Message";
import SignUp from "./pages/SignUp";
import ConfirmEmail from "./pages/ConfirmEmail";
import User from "./pages/User";
import ElasticFeed from "./pages/ElasticFeed";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F6F7F9;
  }
`;

function App() {
  const initialState = {
    location: { lat: null, lan: null }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "changeLocation":
        return {
          ...state,
          location: action.newLocation
        };

      default:
        return state;
    }
  };
  const [loading, setLoading] = React.useState(true);
  const [authGoogle] = useMutation(SIGNIN_GOOGLE_MUTATION, {
    onCompleted({ authGoogle }) {
      console.log(authGoogle);
      if (authGoogle.accessToken) {
        setAccessToken(authGoogle.accessToken);
        setLoading(false);
      }
    },
    update(cache, { data: { authGoogle } }) {
      const data = cache.readQuery({ query: GET_ME });
      cache.writeQuery({
        query: GET_ME,
        data: { me: authGoogle.user }
      });
    }
  });

  const persistUser = async setLoading => {
    const x = await fetch("http://localhost:3000/refresh_token", {
      method: "POST",
      credentials: "include"
    });
    const { accessToken } = await x.json();
    setAccessToken(accessToken);
    setLoading(loading => !loading);
  };

  React.useEffect(() => {
    persistUser(setLoading);
    const googleUser = Cookies.get("gtoken");
    if (googleUser) {
      authGoogle({ variables: { input: { accessToken: googleUser } } });
    }
  }, []);

  if (loading) return <div>loading...</div>;
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={normalTheme}>
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
              <AppRoute
                exact
                path="/signup"
                component={SignUp}
                layout={LoginLayout}
              />
              <AppRoute
                exact
                path="/confirm-email/:email/:emailConfirmToken"
                component={ConfirmEmail}
                layout={LoginLayout}
              />
              <AppRoute
                exact
                path="/feed"
                component={ElasticFeed}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path="/feed/search/:category"
                component={Feed}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path="/elasticfeed"
                component={ElasticFeed}
                layout={MainLayout}
              />
              <PrivatRoute
                exact
                path="/createpost"
                component={CreatePost}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path="/account"
                component={Account}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path="/post/:id"
                component={Post}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path="/user/:id"
                component={User}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path="/users"
                component={Users}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path="/messages"
                component={Messages}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path="/message/t/:channelId"
                component={Message}
                layout={MainLayout}
              />

              <AppRoute component={NotFound} layout={LoginLayout} />
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
