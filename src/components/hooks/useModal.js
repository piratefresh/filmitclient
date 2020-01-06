import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { AddButton } from "../buttons/buttons";

const useModal = () => {
  const [isShown, setIsShown] = React.useState(false);
  function toggle() {
    setIsShown(!isShown);
  }

  return {
    toggle,
    isShown
  };
};

export default useModal;
