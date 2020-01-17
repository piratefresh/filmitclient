import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import StyledLink from "../link/StyledLink";
import { format } from "date-fns";

const Posts = ({ posts }) => {
  if (!posts) return <div>No Posts</div>;
  return (
    <PostsContainer>
      <div>
        {posts.map((post, index) => {
          return (
            <Post key={index}>
              <div className="post-header">
                <StyledLink to={`/post/${post.id}`}>
                  <img className="post-img" src={post.postImage} />
                </StyledLink>

                <div className="header-content">
                  <div className="post-title-container">
                    <StyledLink to={`/post/${post.id}`}>
                      <span className="post-title">{post.title}</span>
                    </StyledLink>
                    {post.active && (
                      <span className="post-active">Post is active</span>
                    )}
                  </div>
                  <span className="post-location">{post.location}</span>
                  {/* <span className="post-date">
                    {format(new Date(post.createdAt), "MMM dd")}
                  </span> */}
                </div>
              </div>

              <span className="post-text">{post.text}</span>
            </Post>
          );
        })}
      </div>
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Post = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
  margin-bottom: 5%;
  padding: 5%;
  .post-header {
    display: flex;
    flex-direction: row;
  }
  .post-img {
    width: 80px;
    height: 70px;
    border-radius: 5px;
    object-fit: cover;
  }
  .header-content {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .post-title-container {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .post-title {
        font-weight: 600;
        font-size: 1.2rem;
        color: ${props => props.theme.colors.dark};
      }
      .post-active {
        color: ${props => props.theme.colors.primary};
        font-size: 0.9rem;
      }
    }
    .post-location {
      margin: 2% 0;
    }
    .post-date {
      font-size: 0.9rem;
      font-weight: 400;
      color: ${props => props.theme.colors.primaryLighter};
    }
  }
  .post-text {
    font-size: 0.9rem;
    font-weight: 400;
    margin: 2% 0;
    width: 24em;
    line-height: ${props => props.theme.text.normalLineHeight};
    color: ${props => props.theme.colors.primaryDarker};
    word-wrap: break-word;
  }
`;

export default Posts;
