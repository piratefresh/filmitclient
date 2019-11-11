import React from "react";
import styled, { css } from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useFormik } from "formik";

import { Input } from "../components/forum/Input";
import SignOutButton from "../components/SignOut";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const VideoContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  max-width: 640px;
  video {
    max-height: 100vh;
  }
`;
const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 2;
  width: 700px;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  .error-message {
    color: red;
  }
  h2 {
    font-size: 36px;
  }
  ${props =>
    props.status &&
    css`
      border: 1px solid red;
    `}
`;

const SIGNIN_MUTATION = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
      refreshToken
    }
  }
`;

function Login() {
  const [signIn, { loading }] = useMutation(SIGNIN_MUTATION, {
    onCompleted({ signIn }) {
      localStorage.setItem("token", signIn.token);
      localStorage.setItem("refreshToken", signIn.refreshToken);
    }
  });
  const formik = useFormik({
    initialValues: {
      login: "",
      password: ""
    },
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await signIn({ variables: values });
        console.log(response);
      } catch (err) {
        setStatus(err.graphQLErrors[0].message);
      }
    }
  });
  if (loading) return <p>Loading ...</p>;
  return (
    <Container>
      <VideoContainer>
        <video
          autoplay=""
          muted=""
          loop=""
          src="https://media-waterdeep.cursecdn.com/login-sidebar-video/sidebar_video_2.webm"
        ></video>
      </VideoContainer>
      <LoginContainer status={formik.status}>
        {!!formik.status && (
          <span className="error-message">{formik.status}</span>
        )}
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="login"
            placeholder="Email"
            defaultValue="test"
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          <Input
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <input type="submit" />
        </form>
      </LoginContainer>
      <SignOutButton>Sign Out</SignOutButton>
    </Container>
  );
}

export default Login;
