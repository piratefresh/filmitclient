import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "../../pages/Home";
import Feed from "../../pages/Feed";
import NotFound from "../../pages/NotFound";

const Routes = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/feed" component={Feed} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Routes;
