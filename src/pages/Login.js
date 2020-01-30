import React from "react";
import styled, { css } from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { useFormik } from "formik";
import { setAccessToken } from "../accessToken";

import { Input } from "../components/form/Input";
import GoogleSignInBtn from "../components/buttons/GoogleBtn";
import { AddButton } from "../components/buttons/buttons";
import { SIGNIN_MUTATION } from "../graphql/mutations";
import { GET_ME } from "../graphql/queries";

function Login({ history }) {
  const [signIn, { loading }] = useMutation(SIGNIN_MUTATION, {
    onCompleted({ signIn }) {
      if (signIn.accessToken) {
        setAccessToken(signIn.accessToken);
        history.push("/");
      }
    },
    update(cache, { data: { signIn } }) {
      // const { me } = cache.readQuery({ query: GET_ME });
      cache.writeQuery({
        query: GET_ME,
        data: { me: signIn.user }
      });
    }
  });
  const formik = useFormik({
    initialValues: {
      login: "",
      password: ""
    },
    onSubmit: async ({ login, password }, { setSubmitting, setStatus }) => {
      signIn({
        variables: { login, password }
      });
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
            <div className="form-buttons">
              <AddButton type="submit">Login</AddButton>
              <a href="/signup">Sign-up for an account</a>
            </div>
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
    .form-buttons {
      display: flex;
      justify-content: space-between;
    }
    .button-container {
      width: 100%;
      max-width: 350px;
      margin: 70px auto;
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
