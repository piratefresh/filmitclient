import React from "react";
import { useField, form } from "formik";
import PropTypes from "prop-types";
import styled from "styled-components";

export function Checkbox(props) {
  // this will return field props for an <input />
  const [field, meta, helpers] = useField(props.name);
  return (
    <>
      <label>
        <StyledCheckBox
          {...field}
          type="checkbox"
          checked={field.value.includes(props.value)}
          onChange={() => {
            const set = new Set(field.value);
            if (set.has(props.value)) {
              set.delete(props.value);
            } else {
              set.add(props.value);
            }
            props.formik.setFieldValue(props.name, Array.from(set));
            helpers.setTouched(field.name, true);
          }}
        />
        {props.value}
      </label>
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </>
  );
}

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
