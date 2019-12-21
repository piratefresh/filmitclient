import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => (
  <StyledCheckBox
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
  />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

const StyledCheckBox = styled.input`
  line-height: 40px;
  margin: 10px 15px;
  border-bottom: 1px solid ${props => props.theme.colors.primary};
  outline: 1px solid ${props => props.theme.colors.primary};
`;

export default Checkbox;
