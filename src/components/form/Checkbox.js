import React from "react";
import { useField, form } from "formik";

export function Checkbox(props) {
  // this will return field props for an <input />
  const [field, meta, helpers] = useField(props.name);
  return (
    <>
      <label>
        <input
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
