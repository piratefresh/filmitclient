import React from "react";
import styled from "styled-components";
import GoogleSvg from "./google.svg";

const ButtonStyled = styled.button`
  background-color: #4285f4;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 3%;
  width: 100%;
  height: 75px;
  border: none;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;

  .sign-button-icon {
    background-image: url(${GoogleSvg});
    flex: 0 0 auto;
    height: 69px;
    width: 69px;
    margin-right: 24px;
    background-color: #fff;
    border-radius: 2px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 35px;
  }
  .sign-button-text {
    color: #fff;
    font-size: 22px;
    font-weight: 500;
  }
`;

export default () => {
  return (
    <ButtonStyled>
      <div className="sign-button-icon"></div>
      <span className="sign-button-text">Sign in With Google</span>
    </ButtonStyled>
  );
};
