import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import StyledLink from "../link/StyledLink";
import { format } from "date-fns";
import useEventListener from "../hooks/useEventHandler";

const handleScroll = ({ currentTarget }, onLoadMore) => {
  if (
    currentTarget.scrollTop + currentTarget.clientHeight >=
    currentTarget.scrollHeight
  ) {
    onLoadMore();
  }
};

const handleOnScroll = () => {
  // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
  var scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;
  var scrollHeight =
    (document.documentElement && document.documentElement.scrollHeight) ||
    document.body.scrollHeight;
  var clientHeight =
    document.documentElement.clientHeight || window.innerHeight;
  var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
  if (scrolledToBottom) {
  }
};

const Posts = ({ posts, onLoadMore }) => {
  const [fetch, setFetch] = React.useState(false);
  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handleOnScroll = React.useCallback(
    onLoadMore => {
      // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
      var scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      var scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      var clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      var scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (scrolledToBottom) {
        setFetch(true);
      } else {
        setFetch(false);
      }
    },
    [setFetch]
  );
  useEventListener("scroll", handleOnScroll);

  React.useEffect(() => {
    if (fetch && onLoadMore) onLoadMore();
  }, [fetch, onLoadMore]);

  if (!posts) return <div>No Posts</div>;
  return (
    <PostsContainer>
      <div onScroll={e => console.log("SCROLLING")}>
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
                  <span className="post-location">{post.city}</span>
                  <span className="post-date">
                    {format(new Date(post.createdAt), "MMM dd")}
                  </span>
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
