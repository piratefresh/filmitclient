import React from "react";

const useSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    toggle,
    isOpen
  };
};

export default useSidebar;
