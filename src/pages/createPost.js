import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST_MUTATION } from "../graphql/mutations";
import { Input } from "../components/form/BasicInput";

import { MainContainer } from "../components/container";

const CreatePost = () => {
  const [fields, setFields] = React.useState([{ value: null }]);
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION);
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      category: "",
      tags: "",
      startDate: "",
      endDate: ""
    },
    onSubmit: async (
      { title, text, category, tags, startDate, endDate },
      { setSubmitting, setStatus }
    ) => {
      createPost({
        variables: { title, text, category, tags, startDate, endDate }
      });
    }
  });

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    formik.values.tags = values;
  }

  function handleRemove(i) {
    const values = [...formik.values.tags];
    values.splice(i, 1);
    formik.values.tags = values;
  }
  return (
    <MainContainer>
      <h1>Create Post</h1>
      <form>
        <Input
          name="title"
          label="Title"
          icon="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          defaultValue
        />
        <Input
          name="text"
          label="Text"
          icon="text"
          type="textarea"
          onChange={formik.handleChange}
          value={formik.values.text}
          defaultValue
        />
        <Input
          name="category"
          label="Category"
          icon="category"
          onChange={formik.handleChange}
          value={formik.values.category}
          defaultValue
        />
        {fields.map((field, idx) => {
          return (
            <div key={`${field}-${idx}`}>
              <Input
                name="tags"
                label="Tags"
                icon="tags"
                onChange={formik.handleChange}
                value={formik.values.tags || ""}
                defaultValue
              />
              <button type="button" onClick={() => handleRemove(idx)}>
                X
              </button>
            </div>
          );
        })}
      </form>
    </MainContainer>
  );
};

export default CreatePost;
