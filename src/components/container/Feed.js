import styled from "styled-components";

export const Container = styled.main`
  padding: 5%;
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .header-filter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.white};
    padding: 5px;
    border-radius: 5px;
    .searchInput {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 100%;
      .icon {
        min-width: 30px;
        height: 100%;
        position: relative;
        svg {
          position: absolute;
          display: inline-block;
          stroke: ${props => props.theme.colors.dark};
          transform: scale(0.8);
        }
      }

      input {
        outline: none;
        border: none;
        background-color: ${props => props.theme.colors.lightGrey};
        border-radius: 5px;
        padding: 5px;
        width: 100%;
      }
    }
  }
`;

export const StyledPostContainer = styled.div`
  margin: 20px 0;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5%;
  width: 100%;
`;
