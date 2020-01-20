import React from "react";
import styled from "styled-components";

const Sidebar = ({ open, children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.white};
  margin-bottom: 20px;
`;

export default Sidebar;
