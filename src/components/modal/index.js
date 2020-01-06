import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { AddButton } from "../buttons/buttons";
import useClickOnOutside from "../hooks/useClickOnOutside";

const Modal = ({ toggle, children }) => {
  const ref = React.useRef();
  useClickOnOutside(ref, () => toggle());
  const props = useSpring({
    to: { opacity: 1, marginTop: 0 },
    from: { opacity: 0, marginTop: -1000 }
  });
  return ReactDOM.createPortal(
    <ModalContainer>
      <div className="modal-background"></div>
      <div className="modal-wrapper">
        <animated.div style={props}>
          <div className="modal-content" ref={ref}>
            {children}
          </div>
        </animated.div>
      </div>
    </ModalContainer>,
    document.body
  );
};

const ModalContainer = styled.div`
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 40;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
  }
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    .modal-content {
      display: flex;
      flex-direction: column;
      background: ${props => props.theme.colors.white};
      padding: 2em;
    }
  }
`;

export default Modal;
