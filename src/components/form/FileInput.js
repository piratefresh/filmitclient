import React from "react";
import styled from "styled-components";
import FileUpload from "../../icons/FileUpload";

export const FileInput = ({ label, icon, name, setFieldValue, userId }) => {
  const uploadFile = async e => {
    console.log("uploading file...");
    console.log(userId);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "filmit");
    data.append("userId", userId);

    const res = await fetch(`http://localhost:3000/api/portfolio/uploadImage`, {
      method: "POST",
      body: data
    });
    try {
      const file = await res.json();
      console.log(file);
      setFieldValue(file.secure_url, name);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <label htmlFor="">
        <input type="file" onChange={uploadFile} />
        <span className="file-cta">
          <span className="fileIcon">
            {typeof icon === "string" && icon.length > 0 ? (
              <img src={icon} />
            ) : (
              <FileUpload />
            )}
          </span>
          <span className="fileLabel">{label}</span>
        </span>
      </label>
    </Container>
  );
};

const Container = styled.div`
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
  position: relative;
  label {
    align-items: stretch;
    display: flex;
    cursor: pointer;
    justify-content: flex-start;
    overflow: hidden;
    position: relative;
    input {
      height: 100%;
      left: 0;
      opacity: 0;
      outline: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
    .file-cta {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-color: #dbdbdb;
      background-color: #fff;
      border-radius: 4px;
      font-size: 1em;
      padding: 0.5em 1em;
      white-space: nowrap;
      svg {
        stroke: ${props => props.theme.colors.primaryDarker};
      }
    }
  }
`;
