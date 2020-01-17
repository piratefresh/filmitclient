import React from "react";

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
