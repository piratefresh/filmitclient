import React from "react";
import PropTypes from "prop-types";

const MessageIcon = ({ fill, stroke, strokeWidth, className, ...props }) => (
  <svg
    width={24}
    height={24}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

MessageIcon.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  className: PropTypes.string
};

MessageIcon.defaultProps = {
  fill: "none",
  stroke: "#f6f9fc",
  strokeWidth: "2",
  className: "nav-icon"
};

export default MessageIcon;
