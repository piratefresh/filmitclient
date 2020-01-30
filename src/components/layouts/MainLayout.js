import React from "react";
import { MobileNav } from "../nav/MobileNav";
import { Query } from "react-apollo";
import { GET_ME } from "../../graphql/queries";

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
