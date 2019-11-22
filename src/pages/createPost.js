import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST_MUTATION } from "../graphql/mutations";
import { Input } from "../components/form/BasicInput";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";

import { MainContainer } from "../components/container";
import PlusIcon from "../icons/Plus";
import { AddButton } from "../components/buttons/buttons";

const CreatePost = () => {
  const [fields, setFields] = React.useState([{ value: null }]);
  const [startDate, setStartDate] = React.useState([{ value: null }]);
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

  function dynamicChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
    formik.values.tags = values;
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
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
        <AddButton type="button" onClick={() => handleAdd()}>
          Add Tag <PlusIcon />
        </AddButton>
        {fields.map((field, idx) => {
          return (
            <TagsContainer>
              <label htmlFor={`tag${idx + 1}`}>{`Tag ${idx + 1}`}</label>
              <div className="tags-inputs" key={`${field}-${idx}`}>
                <input
                  name={`tag${idx + 1}`}
                  key={`tag${idx}`}
                  onChange={e => dynamicChange(idx, e)}
                />
                <AddButton
                  className="deleteButton"
                  type="button"
                  onClick={() => handleRemove(idx)}
                >
                  X
                </AddButton>
              </div>
            </TagsContainer>
          );
        })}
        <label htmlFor="startdate">Start Date</label>
        <DayPickerInput
          formatDate={formatDate}
          parseDate={parseDate}
          placeholder="Select estimated start date"
          format="LL"
          onDayChange={day => formik.setFieldValue("startDate", day)}
        />
      </form>
    </MainContainer>
  );
};

const TagsContainer = styled.div`
  margin-top: 5%;
  label {
  }
  .tags-inputs {
    input {
      width: 98%;
      padding-top: 2%;
      padding-bottom: 2%;
      padding-left: 2%;
      border: 1px solid ${props => props.theme.colors.lightBlue};
      border-radius: 5px;
    }

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2%;
    align-items: center;
    .deleteButton {
      padding: 2% 4%;
    }
  }
`;

export default CreatePost;
