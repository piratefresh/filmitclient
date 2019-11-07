import React, { useState } from "react";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

const ADD_AVATAR = gql`
  mutation uploadAvatar($imageUrl: String!) {
    uploadAvatar(imageUrl: $imageUrl) {
      id
    }
  }
`;

export function UploadAvatar() {
  const [uploadFileMutation, { data }] = useMutation(ADD_AVATAR);
  const apolloClient = useApolloClient();

  const [image, setImage] = useState();
  const [largeImage, setLargeImage] = useState();

  const uploadFile = async e => {
    console.log("uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "filmit");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/da91pbpmj/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLargeImage(file.secure_url);
    uploadFileMutation({ variables: { imageUrl: file.secure_url } });
  };

  return (
    <label htmlFor="file">
      Image
      <input
        type="file"
        id="file"
        name="file"
        placeholder="Upload an image"
        required
        onChange={uploadFile}
      />
      {image && <img width="200" src={image} alt="Upload Preview" />}
    </label>
  );
}
