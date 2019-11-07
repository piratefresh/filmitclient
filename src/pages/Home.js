import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UploadAvatar } from "../components/FileUpload";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      username
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading ...</p>;
  console.log(data);
  return (
    <div>
      <h2>Home</h2>
      {data.users.map(user => {
        return <li>{user.username}</li>;
      })}
      <UploadAvatar />
    </div>
  );
}

export default Home;
