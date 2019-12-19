import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS, GET_ME } from "../graphql/queries";
import { UploadAvatar } from "../components/FileUpload";

function Post() {
  let { id } = useParams();
  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
}

export default Post;
