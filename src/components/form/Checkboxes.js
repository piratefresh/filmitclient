import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useField } from "formik";

const Checkbox = ({ label, notif, setFieldValue, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <label key={notif.title}>
      <StyledCheckBox
        multiple
        name={field.name}
        type="checkbox"
        checked={field.value.includes(notif.value)}
        onChange={() => {
          const set = new Set(field.value);
          if (set.has(notif.value)) {
            set.delete(notif.value);
          } else {
            set.add(notif.value);
          }
          console.log(Array.from(set));
          setFieldValue(props.name, Array.from(set));
        }}
      />
      {notif.title}
    </label>
  );
};

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

const StyledCheckBox = styled.input`
  line-height: 40px;
  margin: 10px 15px;
  border-bottom: 1px solid ${props => props.theme.colors.primary};
  outline: 1px solid ${props => props.theme.colors.primary};
`;

export default Checkbox;
