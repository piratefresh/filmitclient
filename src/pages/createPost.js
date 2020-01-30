/*global google*/
import React from "react";
import styled from "styled-components";
import { useFormik, FormikProvider } from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_POST_MUTATION } from "../graphql/mutations";
import { CATEGORIES } from "../components/data/constants";
import { Input } from "../components/form/BasicInput";
import { UploadImage } from "../components/upload/ImageUpload";
import "../styles/geosuggest.css";
import Geosuggest, { Suggest } from "react-geosuggest";
import { useStateValue } from "../contexts";
import CheckBox from "../components/form/Checkboxes";
import { SEARCH_POSTS } from "../graphql/queries";
import { GET_LOCAL_ME } from "../graphql/localQueries";
import { MainContainer } from "../components/container";
import PlusIcon from "../icons/Plus";
import { AddButton } from "../components/buttons/buttons";

const CreatePost = ({ history }) => {
  const [{ location }] = useStateValue();
  const [fields, setFields] = React.useState([{ value: null }]);
  const [image, setImage] = React.useState();
  const [largeImage, setLargeImage] = React.useState();
  const { data: meData } = useQuery(GET_LOCAL_ME);
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted({ createPost }) {
      if (createPost.title) {
        history.push("/feed");
      }
    },
    async update(client, { data }) {
      // Complicated because of elasticsearch DB
      try {
        const { searchPosts } = await client.readQuery({
          variables: {
            term: "",
            category: [],
            lat: location.lat,
            lon: location.lon
          },
          awaitRefetchQueries: true,
          query: SEARCH_POSTS
        });
        const newData = {
          ...data.createPost,
          id: parseInt(searchPosts.edges[0].id, 10) + 1,
          createdAt: new Date().toISOString(),
          username: meData.me.username,
          firstName: meData.me.firstName,
          lastName: meData.me.lastName,
          __typename: searchPosts.edges[0].__typename
        };
        client.writeQuery({
          query: SEARCH_POSTS,
          variables: {
            term: "",
            category: [],
            lat: location.lat,
            lon: location.lon
          },
          data: {
            searchPosts: {
              edges: [newData, ...searchPosts.edges],
              pageInfo: searchPosts.pageInfo,
              __typename: searchPosts.__typename
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      category: [],
      tagsObj: "",
      postImage: "",
      city: "",
      lat: "",
      lon: ""
    },
    onSubmit: async (
      { title, text, category, tagsObj, postImage, city, lat, lon },
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
          city,
          lat,
          lon
        }
      });
    }
  });
  React.useEffect(() => {
    formik.setFieldValue("postImage", image);
  }, [image]);

  const fetchPattern = async event => {
    event.preventDefault();
    const res = await fetch(
      "https://source.unsplash.com/640x480/?abstract,pattern"
    );
    // const data = await res.json();
    setImage(res.url);
    setLargeImage(res.url);
  };

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
        lon: lng,
        city: label
      });
    }
  }
  return (
    <MainContainer>
      <h1>Create Post</h1>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <span className="FieldTitle">Post Image</span>
          <ImageContainer>
            {image && <img width="200" src={image} alt="Upload Preview" />}

            <UploadImage
              setImage={setImage}
              setLargeImage={setLargeImage}
              label="Header Image"
            />
          </ImageContainer>
          <button onClick={fetchPattern}>Random Photo</button>
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
          <span className="FieldTitle">Location</span>
          <Geosuggest
            onSuggestSelect={onSuggestSelect}
            placeholder="City or Zip"
            location={new google.maps.LatLng(53.558572, 9.9278215)}
            types={["(regions)"]}
            country={["us", "ca"]}
            radius={20}
          />
          <span className="FieldTitle">Category</span>
          <CheckboxList>
            {CATEGORIES.map(notif => {
              return (
                <CheckBox
                  name="category"
                  notif={notif}
                  key={notif.key}
                  setFieldValue={formik.setFieldValue}
                />
              );
            })}
          </CheckboxList>
          <FormSection>
            <h3>Add Post Tags:</h3>
          </FormSection>
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
          <AddButton type="submit" className="submit-button">
            Submit
          </AddButton>
        </form>
      </FormikProvider>
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
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    display: block;
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
    margin-top: 75px;
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
  margin-bottom: 10%;
`;

export default CreatePost;
