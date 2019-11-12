import React from "react";
import styled, { css } from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useFormik } from "formik";

import { Input } from "../components/forum/Input";
import GoogleSignInBtn from "../components/buttons/GoogleBtn";

const SIGNUP_MUTATION = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

function SignUp() {
  const [signUp, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted({ signUp }) {
      history;
    }
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await signUp({ variables: values });
        console.log(response);
      } catch (err) {
        console.log(err);
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
        <div className="login-wrapper">
          {!!formik.status && (
            <span className="error-message">{formik.status}</span>
          )}
          <h2>Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <Input
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <Input
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Input
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <input type="submit" />
          </form>
          <div className="button-container">
            <a href="/google">
              <GoogleSignInBtn />
            </a>
          </div>
        </div>
      </LoginContainer>
    </Container>
  );
}

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

  .login-wrapper {
    max-width: 580px;
    width: 100%;
    .button-container {
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
    }
  }
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

export default Login;
