/*global google*/
import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ME } from "../graphql/queries";
import {
  UPDATE_PROFILE_MUTATION,
  SIGNOUT_MUTATION
} from "../graphql/mutations";
import { useFormik } from "formik";
import { setAccessToken } from "../accessToken";
import { withAuth } from "../session/withAuth";
import Geosuggest, { Suggest } from "react-geosuggest";
import Carousel from "@brainhubeu/react-carousel";
import { UploadImage } from "../components/upload/ImageUpload";
import Posts from "../components/list/Posts";
import { Input } from "../components/form/BasicInput";
import { FileInput } from "../components/form/FileInput";
import { AddButton } from "../components/buttons/buttons";
import "@brainhubeu/react-carousel/lib/style.css";

const AccountPage = ({ history }) => {
  const { loading, error, data } = useQuery(GET_ME);
  const [image, setImage] = React.useState();
  const [largeImage, setLargeImage] = React.useState();
  React.useEffect(() => {
    setImage(data.me.avatar ? data.me.avatar : image);
    formik.setFieldValue("avatar", image);
  }, [image, data.me.avatar]);
  const [updateProfile, { loading: updateProfileLoading }] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      onCompleted({ updateProfile }) {},
      update(cache, { data: { updateProfile } }) {
        // const { me } = cache.readQuery({ query: GET_ME });
        cache.writeQuery({
          query: GET_ME,
          data: { me: updateProfile.user }
        });
      }
    }
  );
  const formik = useFormik({
    initialValues: {
      id: data.me.id,
      username: data.me.username,
      firstName: data.me.firstName,
      lastName: data.me.lastName,
      email: data.me.email,
      city: data.me.city,
      lat: data.me.lat,
      lon: data.me.lon,
      homepage: data.me.homepage ? data.me.homepage : "",
      bio: data.me.bio ? data.me.bio : "",
      avatar: data.me.avatar ? data.me.avatar : "",
      portfolioIcon1: data.me.portfolioIcon1 ? data.me.portfolioIcon1 : "",
      portfolioIcon2: data.me.portfolioIcon2 ? data.me.portfolioIcon2 : "",
      portfolioIcon3: data.me.portfolioIcon3 ? data.me.portfolioIcon3 : "",
      facebook: data.me.facebook,
      instagram: data.me.instagram,
      linkedin: data.me.linkedin,
      vimeo: data.me.vimeo
    },
    onSubmit: async (
      {
        id,
        username,
        email,
        homepage,
        bio,
        avatar,
        firstName,
        lastName,
        city,
        lat,
        lon,
        facebook,
        instagram,
        linkedin,
        vimeo
      },
      { setSubmitting, setStatus }
    ) => {
      updateProfile({
        variables: {
          id,
          username,
          email,
          homepage,
          bio,
          avatar: image,
          firstName,
          lastName,
          city,
          lat,
          lon,
          facebook,
          instagram,
          linkedin,
          vimeo
        }
      });
      console.log(username, email, homepage, bio, avatar, firstName, lastName);
    }
  });
  const [signOut, { data: signOutData, client }] = useMutation(
    SIGNOUT_MUTATION,
    {
      onCompleted({ signOut }) {
        if (signOut) {
          history.push("/");
        }
      }
    }
  );
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
  if (loading) return <div>Loading...</div>;
  if (updateProfileLoading) return <div>Loading...</div>;
  if (error) return console.log(error);
  return (
    <AccountContainer>
      <h1>Account Page</h1>
      <AddButton
        onClick={async () => {
          await signOut();
          setAccessToken("");
          await client.resetStore();
        }}
      >
        Sign Out
      </AddButton>
      <ImageContainer>
        {image && <img width="200" src={image} alt="Upload Preview" />}
        <UploadImage
          setFieldValue={formik.setFieldValue}
          setImage={setImage}
          label="Header Image"
        />
      </ImageContainer>
      <form onSubmit={formik.handleSubmit}>
        <FormSection>
          <div>
            <h3>Basic Information:</h3>
          </div>
        </FormSection>
        <Input
          name="username"
          label="Username"
          icon="at"
          onChange={formik.handleChange}
          value={formik.values.username}
          defaultValue={data.me.username}
        />
        <Input
          name="firstName"
          label="First Name"
          icon="at"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          defaultValue={data.me.firstName}
        />
        <Input
          name="lastName"
          label="Last Name"
          icon="at"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          defaultValue={data.me.lastName}
        />
        <Input
          name="email"
          label="Email"
          icon="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          defaultValue={data.me.email}
        />
        <FormSection>
          <div>
            <h3>Additional Details:</h3>
          </div>
        </FormSection>
        <span className="FieldTitle">Location</span>
        <Geosuggest
          onSuggestSelect={onSuggestSelect}
          placeholder="City or Zip"
          initialValue={data.me.city ? data.me.city : "test"}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          types={["(regions)"]}
          country={["us", "ca"]}
          radius={20}
        />
        <Input
          name="homepage"
          label="Homepage"
          icon="home"
          onChange={formik.handleChange}
          value={formik.values.homepage}
          defaultValue={data.me.homepage}
        />
        <Input
          name="bio"
          label="Bio"
          icon="bio"
          type="textarea"
          onChange={formik.handleChange}
          value={formik.values.bio}
          defaultValue={data.me.bio}
        />
        <Input
          name="vimeo"
          label="Vimeo"
          icon="home"
          onChange={formik.handleChange}
          value={formik.values.vimeo}
          defaultValue={data.me.vimeo}
        />
        <Input
          name="facebook"
          label="facebook"
          icon="home"
          onChange={formik.handleChange}
          value={formik.values.facebook}
          defaultValue={data.me.facebook}
        />
        <Input
          name="instagram"
          label="Instagram"
          icon="home"
          onChange={formik.handleChange}
          value={formik.values.instagram}
          defaultValue={data.me.instagram}
        />
        <Input
          name="linkedin"
          label="Linkedin"
          icon="home"
          onChange={formik.handleChange}
          value={formik.values.linkedin}
          defaultValue={data.me.linkedin}
        />
        <FormSection>
          <div>
            <h3>Portfolio:</h3>
          </div>
        </FormSection>
        <PortfolioInputs>
          <FileInput
            userId={data.me.id}
            name="portfolioIcon1"
            icon={formik.values.portfolioIcon1}
            setFieldValue={formik.setFieldValue}
            label="Portfolio 1"
          />
          <FileInput
            userId={data.me.id}
            name="portfolioIcon2"
            icon={formik.values.portfolioIcon2}
            setFieldValue={formik.setFieldValue}
            label="Portfolio 2"
          />
          <FileInput
            userId={data.me.id}
            name="portfolioIcon3"
            icon={formik.values.portfolioIcon3}
            setFieldValue={formik.setFieldValue}
            label="Portfolio 3"
          />
        </PortfolioInputs>

        <AddButton type="submit" className="submit-button">
          Update Profile
        </AddButton>
      </form>
      <FormSection>
        <div>
          <h3>Project History:</h3>
        </div>
      </FormSection>
      <MyPostContainer>
        <h2>My Posts</h2>
        <Posts posts={data.me.posts}></Posts>
      </MyPostContainer>
    </AccountContainer>
  );
};

const AccountContainer = styled.div`
  padding: 5%;
  h1 {
    text-align: center;
  }
  .user-picture {
    height: 120px;
    margin-bottom: 5%;
  }
  .submit-button {
    width: 100%;
    margin-top: 10%;
    padding: 15px 20px;
    text-align: center;
    justify-content: center;
  }
`;

const MyPostContainer = styled.div``;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
  img {
    margin-bottom: 2%;
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
const PortfolioInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CarouselContainer = styled.div`
  margin-top: 25px;
  .slide {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

export default withAuth(data => data && data.me)(AccountPage);
