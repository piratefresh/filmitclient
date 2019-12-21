import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_POST } from "../graphql/queries";

import { Avatar } from "../components/avatar";

function Post() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const { post } = data;
  return (
    <PostContainer>
      <img src={post.postImage} alt={`Header Image for ${post.title}`} />
      <div className="post-text-container">
        <div className="post-header">
          <h2 className="post-title">{post.title}</h2>
          <span className="post-location">{post.location}</span>
        </div>

        <div className="post-meta-details-container">
          <Avatar
            src={`http://localhost:8000/myAvatars/${post.user.id}`}
            alt={`Avatar for ${post.user.username}`}
            size="large"
          />
          <div className="post-meta-details">
            <div>{post.user.username}</div>
            <div>{post.user.email}</div>
          </div>
        </div>

        <p className="post-text">{post.text}</p>
      </div>
    </PostContainer>
  );
}

export default Post;

const PostContainer = styled.div`
  .post-meta-details-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    color: ${props => props.theme.colors.primaryLighter};
    .post-meta-details {
      margin-left: 15px;
      line-height: ${props => props.theme.text.normalLineHeight};
      color: ${props => props.theme.colors.dark};
    }
  }
  img {
    width: 100%;
    max-height: 60vh;
    object-fit: cover;
  }
  .post-text-container {
    padding: 5%;
    margin: 5%;
    line-height: ${props => props.theme.text.wideLineHeight};
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primaryDarker};
    border-radius: 5px;
    .post-title {
      font-size: ${props => props.theme.textSize.headline};
      color: ${props => props.theme.colors.primary};
      margin: 0;
      padding: 0;
    }
    .post-location {
      margin-bottom: 2em;
    }
    .post-text {
      white-space: pre-line;
    }
  }
`;
