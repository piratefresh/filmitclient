import React from "react";
import "./App.css";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AppRoute } from "./AppRoute";
import MainLayout from "./components/layouts/MainLayout";
import LoginLayout from "./components/layouts/LoginLayout";
import { setAccessToken, getAccessToken } from "./accessToken";
import Cookies from "js-cookie";
import { useMutation } from "@apollo/react-hooks";
import { SIGNIN_GOOGLE_MUTATION } from "./graphql/mutations";
import { GET_ME } from "./graphql/queries";

import { normalTheme } from "./components/theme";
import { PrivatRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import CreatePost from "./pages/createPost";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Post from "./pages/Post";
import { TestSelect } from "./pages/testSelect";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F6F7F9;
  }
`;

function App() {
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

  const persistUser = async () => {
    const x = await fetch("http://localhost:3000/refresh_token", {
      method: "POST",
      credentials: "include"
    });
    const { accessToken } = await x.json();
    setAccessToken(accessToken);
    setLoading(false);
  };

  React.useEffect(() => {
    persistUser();
    const googleUser = Cookies.get("gtoken");
    if (googleUser) {
      authGoogle({ variables: { input: { accessToken: googleUser } } });
    }
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
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
            <AppRoute exact path="/feed" component={Feed} layout={MainLayout} />
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
              path="/testselect"
              component={TestSelect}
              layout={MainLayout}
            />
            <AppRoute component={NotFound} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
