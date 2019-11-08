import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useFormik } from "formik";

import { Input } from "../components/forum/Input";

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

  h2 {
    font-size: 36px;
  }
`;

const SIGNIN_MUTATION = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

function Login() {
  const [signIn, { loading }] = useMutation(SIGNIN_MUTATION, {
    onCompleted({ signIn }) {
      localStorage.setItem("token", signIn.token);
    }
  });
  const formik = useFormik({
    initialValues: {
      login: "",
      password: ""
    },
    onSubmit: (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      signIn({ variables: values });
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
      <LoginContainer>
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
    </Container>
  );
}

export default Login;
