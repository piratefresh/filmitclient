import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { useFormik } from "formik";
import { setAccessToken } from "../accessToken";

import { AddButton } from "../components/buttons/buttons";
import { CONFIRM_EMAIL_MUTATION } from "../graphql/mutations";
import { GET_ME } from "../graphql/queries";

function Login({ history }) {
  let { email, emailConfirmToken } = useParams();
  const [confirmEmail, { loading }] = useMutation(CONFIRM_EMAIL_MUTATION, {
    onCompleted({ confirmEmail }) {
      if (confirmEmail.accessToken) {
        setAccessToken(confirmEmail.accessToken);
        history.push("/");
      }
    },
    update(cache, { data: { confirmEmail } }) {
      // const { me } = cache.readQuery({ query: GET_ME });
      cache.writeQuery({
        query: GET_ME,
        data: { me: confirmEmail.user }
      });
    }
  });
  const formik = useFormik({
    initialValues: {
      email,
      emailConfirmToken
    },
    onSubmit: async (
      { email, emailConfirmToken },
      { setSubmitting, setStatus }
    ) => {
      confirmEmail({
        variables: { email, emailConfirmToken }
      });
    }
  });
  if (loading) return <p>Loading ...</p>;
  return (
    <Container>
      <LoginContainer status={formik.status}>
        <div className="login-wrapper">
          {!!formik.status && (
            <span className="error-message">{formik.status}</span>
          )}
          <h2>Confirm Email</h2>
          <span>
            Confirm the {email} with token {emailConfirmToken}
          </span>
          <form onSubmit={formik.handleSubmit}>
            <input
              name="email"
              type="hidden"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <input
              name="emailConfirmToken"
              type="hidden"
              onChange={formik.handleChange}
              value={formik.values.emailConfirmToken}
            />
            <AddButton type="submit">Confirm Email</AddButton>
          </form>
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
