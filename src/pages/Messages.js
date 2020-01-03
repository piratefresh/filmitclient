import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import { useFormik } from "formik";
import { GET_USERS, GET_ME } from "../graphql/queries";
import { CREATE_MESSAGE_MUTATION } from "../graphql/mutations";
import { MainContainer } from "../components/container";
import AutoComplete from "../components/autoCompleter/hooks";
import { Input } from "../components/form/BasicInput";

function Messages() {
  const [searchValue, setSearchValue] = React.useState([]);
  const { loading, error, data } = useQuery(GET_ME);
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    GET_USERS
  );
  const [createMessage, { loading: createMessageLoading }] = useMutation(
    CREATE_MESSAGE_MUTATION,
    {
      onCompleted({ createMessage }) {}
    }
  );
  const formik = useFormik({
    initialValues: {
      userId: "",
      receiverId: ""
    },
    onSubmit: async ({ userId, receiverId }, { setSubmitting, setStatus }) => {
      createMessage({
        variables: {
          userId,
          receiverId: searchValue
        }
      });
    }
  });
  React.useEffect(() => {
    console.log(data);
    if (data) {
      formik.setFieldValue("userId", data.me.id);
    }
  }, [data]);
  if (!userData) return <div>No User Data</div>;

  return (
    <MainContainer>
      <h2>Messages</h2>
      {userData && (
        <AutoComplete
          data={userData}
          setSearchValue={setSearchValue}
          setFieldValue={formik.setFieldValue}
        />
      )}
      {searchValue.id && (
        <FormContainer>
          <Input
            name="text"
            label="Text"
            type="textarea"
            // onChange={formik.handleChange}
            // value={formik.values.text}
            defaultValue
          />
        </FormContainer>
      )}
    </MainContainer>
  );
}

const FormContainer = styled.form``;

export default Messages;
