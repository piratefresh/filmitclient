import React from "react";
import { Nav } from "../nav";
import { MobileNav } from "../nav/MobileNav";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 64px;
`;

export default ({ children }) => {
  return (
    <Container>
      <div className="inner-container">{children}</div>
      <MobileNav />
    </Container>
  );
};
