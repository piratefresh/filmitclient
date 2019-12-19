import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ME } from "../graphql/queries";
import { UPDATE_PROFILE_MUTATION } from "../graphql/mutations";
import { useFormik } from "formik";

import { withAuth } from "../session/withAuth";

import Posts from "../components/list/Posts";
import { Input } from "../components/form/BasicInput";

const AccountPage = props => {
  const { loading, error, data } = useQuery(GET_ME);
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
      email: data.me.email,
      homepage: data.me.homepage ? data.me.homepage : "",
      bio: data.me.bio ? data.me.bio : ""
    },
    onSubmit: async (
      { id, username, email, homepage, bio },
      { setSubmitting, setStatus }
    ) => {
      updateProfile({
        variables: { id, username, email, homepage, bio }
      });
      console.log(username, email, homepage, bio);
    }
  });
  if (loading) return <div>Loading...</div>;
  if (updateProfileLoading) return <div>Loading...</div>;
  if (error) return console.log(error);
  return (
    <AccountContainer>
      <h1>Account Page</h1>
      <img
        className="user-picture"
        src={`http://localhost:8000/myAvatars/${data.me.id}`}
        alt={`Avatar for ${data.me.email}`}
      />
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="username"
          label="Username"
          icon="at"
          onChange={formik.handleChange}
          value={formik.values.username}
          defaultValue={data.me.username}
        />
        <Input
          name="email"
          label="Email"
          icon="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          defaultValue={data.me.email}
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

        <input type="submit" />
      </form>
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
`;

const MyPostContainer = styled.div``;

export default withAuth(data => data && data.me)(AccountPage);
