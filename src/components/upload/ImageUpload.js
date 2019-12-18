import React from "react";
import styled from "styled-components";

const customFileInput = function(inputID) {
  //set id of input based on params passed in. default is file
  const id = inputID || "file";
  const fileInput = document.getElementById(id);

  //on change of file input
  fileInput.addEventListener("change", function() {
    //full file path
    const fullPath = document.getElementById(id).value;
    if (fullPath) {
      //index last index location of file path slashes
      const startIndex =
        fullPath.indexOf("\\") >= 0
          ? fullPath.lastIndexOf("\\")
          : fullPath.lastIndexOf("/");
      //remove the excess of path
      let filename = fullPath.substring(startIndex);
      //clear out the final \ or / if exists
      if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
        filename = filename.substring(1);
      }
      //change data attr of html element to update the file name
      document
        .querySelector(".file-control")
        .setAttribute("data-filename", filename);
    }
  });
};

//optional param: input id as string - no hash(#) needed

export function UploadImage({ label, setImage, setLargeImage, setFieldValue }) {
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
    setImage(file.secure_url);
    setLargeImage(file.secure_url);
  };

  React.useEffect(() => {
    customFileInput("file");
  });

  return (
    <InputContainer className="file" htmlFor="file">
      <input
        id="file"
        className="file-input"
        type="file"
        placeholder="Upload an image"
        required
        onChange={uploadFile}
      />
      <span className="file-control" data-filename="Choose File..."></span>
    </InputContainer>
  );
}

const InputContainer = styled.label`
  font-family: inherit;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  height: 53px;
  max-width: 100%;
  position: relative;
  .file-input {
    min-width: 90vw;
  }

  .file-control {
    overflow: hidden;
    font-family: inherit;
    background-color: #fff;
    border: 1px solid ${props => props.theme.colors.lightBlue};
    border-radius: 5px;
    color: #000;
    font-weight: 400;
    height: 10px;
    left: 0;
    line-height: 0.5rem;
    padding: 0.9rem 1.2rem;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    &::before {
      background-color: ${props => props.theme.colors.primary};
      border-radius: 5px;
      bottom: -1px;
      color: #fff;
      content: "Browse";
      display: block;
      height: 53px;
      letter-spacing: 0.05em;
      line-height: 1.25;
      padding: 0.9722rem 1.2731rem;
      position: absolute;
      right: -1px;
      top: -7px;
      z-index: 2;
    }
    &::after {
      content: attr(data-filename);
    }
  }
`;
