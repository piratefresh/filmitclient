import React from "react";
import styled, { css } from "styled-components";
import StyledLink from "../link/StyledLink";
import { format } from "date-fns";

const dumData = [
  {
    title: "Superbad",
    category: ["Light", "Production"],
    tags: ["Comedy", "Drama"],
    text:
      "We have a fun and dynamic group who will be filming all day on Saturday, November 9th in Maywood, CA. If you want to take part in filmmaking, join us! We can provide the transportation to-and-from and we'll feed you, but this is a non-paid offer.We are looking for three energetic and able-bodied people with positive attitudes to help out.",
    startDate: "Nov 16, 2019",
    endDate: "Dec 24, 2019",
    location: "Philadelphia, PA",
    img:
      "https://cdn.dribbble.com/users/3281732/screenshots/8159457/media/9e7bfb83b0bd704e941baa7a44282b22.jpg"
  },
  {
    title: "Taxi Driver",
    category: ["Post-Production", "Editor"],
    tags: ["Comedy", "Drama"],
    text:
      "Barstool Sports is looking for a Freelance Motion Graphics Artist familiar with Adobe Photoshop, After Effects and Illustrator. Video editing experience would be a big plus. Please provide a link to a portfolio or reel when applying. Barstool is a fast pace and growing company. We need creative and driven artists that can thrive is this environment.",
    startDate: "Nov 16, 2019",
    endDate: "Dec 24, 2019",
    location: "Philadelphia, PA",
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8JBEZYMRridpz8sFe63Bzvt3mIZhNsFJbPXOo2qRVKW0-rGP&s",
    active: true
  },
  {
    title: "Assistent Editor",
    category: ["Editor", "Production", "Assistent"],
    tags: ["Comedy", "Drama"],
    text:
      "The Assistant Editor is responsible for supporting our team of video editors and creatives in a fast-paced environment. Ideal candidates are well-versed in all technical aspects of a 4K+ raw video workflow, including file formats, ingesting, logging, proxies, syncing, conforming for online and sound mix, archiving, Media Asset Management and delivering multiple formats for a variety of digital platforms.",
    startDate: "Nov 16, 2019",
    endDate: "Dec 24, 2019",
    location: "Philadelphia, PA",
    img:
      "https://s3.amazonaws.com/images.productionhub.com/jobs/logos/55822_u5ntg3mtuy.jpg"
  }
];

const handleScroll = ({ currentTarget }, onLoadMore) => {
  if (
    currentTarget.scrollTop + currentTarget.clientHeight >=
    currentTarget.scrollHeight
  ) {
    onLoadMore();
  }
};

const Posts = ({ posts, onLoadMore }) => {
  if (!posts) return <div>No Posts</div>;

  return (
    <PostsContainer onScroll={e => handleScroll(e, onLoadMore)}>
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
                <span className="post-date">
                  {format(new Date(post.createdAt), "MMM dd")}
                </span>
              </div>
            </div>

            <span className="post-text">{post.text}</span>
          </Post>
        );
      })}
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
  }
`;

export default Posts;
