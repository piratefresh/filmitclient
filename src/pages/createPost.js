/*global google*/
import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST_MUTATION } from "../graphql/mutations";
import { Input } from "../components/form/BasicInput";
import { UploadImage } from "../components/upload/ImageUpload";
// import { Select } from "../components/form/Select";
import "../styles/geosuggest.css";
import Geosuggest, { Suggest } from "react-geosuggest";
import CheckBox from "../components/form/Checkboxes";

import { GET_POSTS } from "../graphql/queries";
import { MainContainer } from "../components/container";
import PlusIcon from "../icons/Plus";
import { AddButton } from "../components/buttons/buttons";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const CreatePost = ({ history }) => {
  const [fields, setFields] = React.useState([{ value: null }]);
  const [image, setImage] = React.useState();
  const [largeImage, setLargeImage] = React.useState();
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted({ createPost }) {
      if (createPost.title) {
        history.push("/feed");
      }
    },
    update(cache, { data: { createPost } }) {
      let posts = [];
      try {
        const data = cache.readQuery({ query: GET_POSTS });
        posts = data.posts.edges;
      } catch (err) {
        console.log(err);
      }
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: [...posts, createPost] }
      });
    }
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      category: "",
      tagsObj: "",
      postImage: "",
      location: "",
      lat: "",
      lng: ""
    },
    onSubmit: async (
      { title, text, category, tagsObj, postImage, location, lat, lng },
      { setSubmitting, setStatus }
    ) => {
      var tags = tagsObj.map(tag => tag.value);
      createPost({
        variables: {
          title,
          text,
          category,
          tags,
          postImage,
          location,
          lat,
          lng
        }
      });
    }
  });
  React.useEffect(() => {
    formik.setFieldValue("postImage", image);
  }, [image]);

  function dynamicChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
    formik.setFieldValue("tagsObj", values);
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
  function onSuggestSelect(suggest) {
    if (suggest) {
      const {
        location: { lat, lng },
        label
      } = suggest;
      formik.setValues({
        ...formik.values,
        lat,
        lng,
        location: label
      });
    }
  }
  return (
    <MainContainer>
      <h1>Create Post</h1>
      <form onSubmit={formik.handleSubmit}>
        <span>Post Image</span>
        <ImageContainer>
          {image && <img width="200" src={image} alt="Upload Preview" />}

          <UploadImage
            setImage={setImage}
            setLargeImage={setLargeImage}
            label="Header Image"
          />
        </ImageContainer>
        <FormSection>
          <h3>Basic Information:</h3>
        </FormSection>
        <Input
          name="title"
          label="Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          defaultValue
        />
        <Input
          name="text"
          label="Text"
          type="textarea"
          onChange={formik.handleChange}
          value={formik.values.text}
          defaultValue
        />
        <FormSection>
          <h3>Detailed Information:</h3>
        </FormSection>
        <span>Location</span>
        <Geosuggest
          onSuggestSelect={onSuggestSelect}
          placeholder="City or Zip"
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          types={["(regions)"]}
          country={["us", "ca"]}
          radius={20}
        />
        <CheckboxList>
          {checkboxes.map(item => {
            return (
              <label key={item.key}>
                <CheckBox
                  name={item.name}
                  // checked={this.state.checkedItems.get(item.name)}
                  // onChange={this.handleChange}
                />
                {item.name}
              </label>
            );
          })}
        </CheckboxList>
        <AddButton type="button" onClick={() => handleAdd()}>
          Add Tag <PlusIcon />
        </AddButton>
        {fields.map((field, idx) => {
          return (
            <TagsContainer key={`${field}-${idx}`}>
              <label htmlFor={`tag${idx + 1}`}>{`Tag ${idx + 1}`}</label>
              <div className="tags-inputs">
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
        <AddButton type="submit">Submit</AddButton>
      </form>
    </MainContainer>
  );
};
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
  img {
    margin-bottom: 2%;
  }
`;
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

const FormSection = styled.h3`
  h3 {
    color: ${props => props.theme.colors.primary};
    border-bottom: 1px solid ${props => props.theme.colors.primary};
    line-height: 2em;
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 20px 30px;
  max-height: 200px;
  overflow-y: scroll;
  background: #efeef0;
  border: none;
  box-shadow: none;
  font-size: 16px;
  font-weight: 600;
`;

const checkboxes = [
  {
    name: "Movie",
    key: "checkBox1",
    label: "Movie"
  },
  {
    name: "Production",
    key: "checkBox2",
    label: "Production"
  },
  {
    name: "Development",
    key: "checkBox3",
    label: "Development"
  },
  {
    name: "Graphic",
    key: "checkBox4",
    label: "Graphic"
  },
  {
    name: "Visual Effects",
    key: "vfx1",
    label: "vfx"
  },
  {
    name: "Music Production",
    key: "music",
    label: "Music Production"
  },
  {
    name: "Marketing",
    key: "Marketing2",
    label: "Marketing"
  }
];

export default CreatePost;
