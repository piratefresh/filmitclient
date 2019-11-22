import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import EmailIcon from "../../icons/Email";
import PhoneIcon from "../../icons/Phone";
import HomeIcon from "../../icons/Home";
import BioIcon from "../../icons/Bio";
import AtIcon from "../../icons/At";

const Container = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 5%;
`;
const StyledInput = styled.input`
  width: 98%;
  margin-top: 2%;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 2%;
  border: 1px solid ${props => props.theme.colors.lightBlue};
  border-radius: 5px;
`;
const StyledTextArea = styled.textarea`
  width: 98%;
  margin-top: 2%;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 2%;
  border: 1px solid ${props => props.theme.colors.lightBlue};
  border-radius: 5px;
`;
const StyledLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  label {
    display: inline-flex;
    background-color: ${props => props.theme.colors.primary};
    padding: 3px;
    margin-right: 5px;
    align-items: center;
    border-radius: 5px;
    svg {
      transform: scale(0.7);
    }
    span {
      color: ${props => props.theme.colors.white};
    }
  }
`;

export const Input = ({
  value,
  icon,
  label,
  name,
  size,
  onChange,
  defaultValue,
  type,
  isRequired
}) => {
  const icons = {
    ["email"]: <EmailIcon size={size} />,
    ["phone"]: <PhoneIcon size={size} />,
    ["home"]: <HomeIcon size={size} />,
    ["bio"]: <BioIcon size={size} />,
    ["at"]: <AtIcon size={size} />
  };
  return (
    <Container>
      <StyledLabelWrapper>
        {icon ? <label>{icons[icon]}</label> : null}
        <span>{label}</span>
      </StyledLabelWrapper>
      {type === "textarea" ? (
        <StyledTextArea
          rows="4"
          cols="50"
          value={value}
          onChange={onChange}
          id={name}
          name={name}
          placeholder={defaultValue}
        />
      ) : (
        <StyledInput
          value={value}
          onChange={onChange}
          id={name}
          name={name}
          placeholder={defaultValue}
        />
      )}
    </Container>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool
};

Input.defaultProps = {
  isRequired: false,
  size: 16
};
