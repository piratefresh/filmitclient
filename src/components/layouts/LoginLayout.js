import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default ({ children }) => {
  return <Container>{children}</Container>;
};
