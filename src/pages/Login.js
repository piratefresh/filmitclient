import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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

function Login() {
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
        <input></input>
      </LoginContainer>
    </Container>
  );
}

export default Login;
