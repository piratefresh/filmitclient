import React from "react";
import PropTypes from "prop-types";

const Bio = ({ fill, stroke, strokeWidth, size, className, ...props }) => (
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
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
  </svg>
);

Bio.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  className: PropTypes.string
};

Bio.defaultProps = {
  fill: "none",
  stroke: "#f6f9fc",
  strokeWidth: "2",
  className: "nav-icon"
};

export default Bio;
