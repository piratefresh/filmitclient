import React from "react";
import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 5%;
  h1 {
    text-align: center;
  }
  .submit-button {
    width: 100%;
    margin-top: 10%;
    padding: 15px 20px;
    text-align: center;
    justify-content: center;
  }
  .FieldTitle {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    display: block;
  }
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
