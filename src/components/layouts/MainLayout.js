import React from "react";
import { Nav } from "../nav";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default ({ children }) => {
  return (
    <Container>
      <Nav />
      {children}
    </Container>
  );
};
