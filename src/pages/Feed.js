import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS } from "../graphql/queries";
import Posts from "../components/list/Posts";
import { ErrorMessageContainer } from "../components/container";

import { POST_CREATED } from "../graphql/subscription";
import StyledLink from "../components/link/StyledLink";
import { AddButton } from "../components/buttons/buttons";

// const dumData = [
//   {
//     title: "Superbad",
//     category: ["Light", "Production"],
//     tags: ["Comedy", "Drama"],
//     text:
//       "We have a fun and dynamic group who will be filming all day on Saturday, November 9th in Maywood, CA. If you want to take part in filmmaking, join us! We can provide the transportation to-and-from and we'll feed you, but this is a non-paid offer.We are looking for three energetic and able-bodied people with positive attitudes to help out.",
//     startDate: "Nov 16, 2019",
//     endDate: "Dec 24, 2019",
//     location: "Philadelphia, PA",
//     img:
//       "https://cdn.dribbble.com/users/3281732/screenshots/8159457/media/9e7bfb83b0bd704e941baa7a44282b22.jpg"
//   },
//   {
//     title: "Taxi Driver",
//     category: ["Post-Production", "Editor"],
//     tags: ["Comedy", "Drama"],
//     text:
//       "Barstool Sports is looking for a Freelance Motion Graphics Artist familiar with Adobe Photoshop, After Effects and Illustrator. Video editing experience would be a big plus. Please provide a link to a portfolio or reel when applying. Barstool is a fast pace and growing company. We need creative and driven artists that can thrive is this environment.",
//     startDate: "Nov 16, 2019",
//     endDate: "Dec 24, 2019",
//     location: "Philadelphia, PA",
//     img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8JBEZYMRridpz8sFe63Bzvt3mIZhNsFJbPXOo2qRVKW0-rGP&s",
//     active: true
//   },
//   {
//     title: "Assistent Editor",
//     category: ["Editor", "Production", "Assistent"],
//     tags: ["Comedy", "Drama"],
//     text:
//       "The Assistant Editor is responsible for supporting our team of video editors and creatives in a fast-paced environment. Ideal candidates are well-versed in all technical aspects of a 4K+ raw video workflow, including file formats, ingesting, logging, proxies, syncing, conforming for online and sound mix, archiving, Media Asset Management and delivering multiple formats for a variety of digital platforms.",
//     startDate: "Nov 16, 2019",
//     endDate: "Dec 24, 2019",
//     location: "Philadelphia, PA",
//     img:
//       "https://s3.amazonaws.com/images.productionhub.com/jobs/logos/55822_u5ntg3mtuy.jpg"
//   }
// ];

function Feed() {
  const { loading, error, data, subscribeToMore, fetchMore } = useQuery(
    GET_POSTS
  );
  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: POST_CREATED,
      updateQuery: (previousResult, { subscriptionData }) => {
        // If the subscription data does not exist
        // Simply return the previous data
        console.log(previousResult.posts);
        if (!subscriptionData.data) return previousResult;
        const { postCreated } = subscriptionData.data;
        console.log(postCreated);
        return {
          posts: {
            ...previousResult.posts,
            edges: [postCreated, ...previousResult.posts.edges]
          }
        };
      }
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  if (loading) return <div>loading..</div>;
  const posts = data.posts.edges;
  return (
    <Container>
      <div className="header">
        <h2>Feed</h2>
        <StyledLink to="/createpost">
          <AddButton>Add Project</AddButton>
        </StyledLink>
      </div>
      <StyledPostContainer>
        {posts ? (
          <Posts
            posts={posts}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  offset: posts.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    posts: [...prev.posts.edges, ...fetchMoreResult.posts]
                  });
                }
              })
            }
          ></Posts>
        ) : (
          <ErrorMessageContainer>
            No Post Found
            <StyledLink to="/createpost">Add A Post</StyledLink>
          </ErrorMessageContainer>
        )}
      </StyledPostContainer>
    </Container>
  );
}

const Container = styled.main`
  padding: 5%;
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  width: 90%;
  height: 200px;
  padding: 5%;
  margin-bottom: 5%;
  img {
    min-width: 80px;
    height: 60px;
    object-fit: cover;
    margin-right: 2%;
  }
`;
const StyledPostContainer = styled.div``;

export default Feed;
