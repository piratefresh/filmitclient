import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CaretDown from "../../icons/CaretDown";

export const Select = ({
  children,
  id,
  isDisabled,
  isRequired,
  label,
  value,
  name,
  size,
  onChange
}) => {
  return (
    <Container>
      <span>{label}</span>
      <ContainerSelect>
        <StyledSelect
          id={id}
          name={name}
          size={size}
          value={value}
          onChange={onChange}
        >
          {children}
        </StyledSelect>
        <CaretDown className="caret" />
      </ContainerSelect>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
  span {
    margin-bottom: 2%;
  }
`;
const ContainerSelect = styled.div`
  display: inline-block;
  position: relative;

  .caret {
    position: absolute;
    top: 0;
    right: 16px;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    pointer-events: none;
  }
`;
const StyledSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border: 1px solid ${props => props.theme.colors.lightBlue};
  border-radius: 5px;
  outline: none;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-size: auto 18px;
  padding-left: 14px;
  padding-right: 54px;
  padding-top: 2%;
  padding-bottom: 2%;
  width: 100%;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
  /* &Size {
    &Small {
      height: 40px;
    }

    &Large {
      height: 52px;
    }
  } */
`;

Select.propTypes = {
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  isRequired: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string
};

Select.defaultProps = {
  isDisabled: false,
  hasError: false,
  isRequired: false,
  size: "small"
};
