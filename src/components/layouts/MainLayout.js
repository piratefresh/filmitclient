import React from "react";
import { Nav } from "../nav";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  .inner-container {
    padding: 2em;
  }
`;

export default ({ children }) => {
  return (
    <Container>
      <Nav />
      <div className="inner-container">{children}</div>
    </Container>
  );
};
