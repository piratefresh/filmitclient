import styled from "styled-components";

export const AddButton = styled.button`
  border-radius: 5%;
  display: flex;
  align-items: center;
  border: none;
  background-color: ${props => props.theme.colors.primary};
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  height: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDarker};
  }
  &:touch {
    background-color: ${({ theme }) => theme.colors.primaryDarker};
  }
`;
