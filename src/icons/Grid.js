import React from "react";
import PropTypes from "prop-types";

const GridIcon = ({ fill, stroke, strokeWidth, className, ...props }) => (
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
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  </svg>
);

GridIcon.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  className: PropTypes.string
};

GridIcon.defaultProps = {
  fill: "none",
  stroke: "#f6f9fc",
  strokeWidth: "2",
  className: "nav-icon"
};

export default GridIcon;
