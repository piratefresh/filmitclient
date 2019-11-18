import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #2b285c;
  margin-bottom: 25px;
`;
const InputStyled = styled.input`
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08) inset;
  background-color: #fff;
  border: 1px solid transparent;
  padding: 16px;
  color: inherit;
  width: 100%;
  border-radius: 3px;
  ${props =>
    props.up &&
    css`
      border: 1px solid #2b285c;
    `}
`;
const LabelStyled = styled.label`
  position: absolute;
  top: 35%;
  left: 5%;
  will-change: transform;
  transition: transform 0.3s cubic-bezier(0.06, 0.67, 0.32, 0.82);
  transform: translate(20px, 1.333 * 14 + 16px);
  ${props =>
    props.up &&
    css`
      transform: scale(0.8) translate(-20px, -50px);
    `}
`;

export const Input = ({ name, placeholder, isRequired, value, onChange }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputEl = React.useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleLabelClick = () => {
    if (!isFocused && !value) {
      setIsFocused(isFocused);
      inputEl.current.focus();
    }
  };
  return (
    <InputContainer>
      <LabelStyled
        htmlFor={name}
        up={isFocused || value}
        onClick={handleLabelClick}
      >
        {placeholder}
      </LabelStyled>
      <InputStyled
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={isRequired}
        up={isFocused || value}
        ref={inputEl}
      />
    </InputContainer>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool
};

Input.defaultProps = {
  isRequired: false
};
