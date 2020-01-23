import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS, GET_ME } from "../graphql/queries";
import { UploadAvatar } from "../components/FileUpload";

function Home() {
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    GET_USERS
  );
  const { loading: meLoading, error: meError, data: meData } = useQuery(GET_ME);
  if (meLoading || userLoading) return <p>Loading ...</p>;
  console.log(meError);

  if (!meData) return <div>No User Data</div>;
  return (
    <div>
      <h2>Home</h2>
      {userData &&
        userData.users.map((user, i) => {
          return <li key={i}>{user.username}</li>;
        })}
    </div>
  );
}

export default Home;
