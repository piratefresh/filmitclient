import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS } from "../graphql/queries";
import Posts from "../components/list/Posts";
import { ErrorMessageContainer } from "../components/container";
import Sidebar from "../components/menu/Sidebar";
import useSidebar from "../components/hooks/useSidebar";
import SearchInput from "../components/form/SearchInput";
import Search from "../icons/Search";
import { CATEGORIES } from "../components/data/constants";

import { POST_CREATED } from "../graphql/subscription";
import StyledLink from "../components/link/StyledLink";
import { AddButton, SecondaryButton } from "../components/buttons/buttons";

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

  const { isOpen, toggle } = useSidebar();
  if (loading) return <div>loading..</div>;

  return (
    <Container>
      <div className="header">
        <h2>Feed</h2>
        <StyledLink to="/createpost">
          <AddButton>Add Project</AddButton>
        </StyledLink>
      </div>
      <div className="header-filter">
        <div className="searchInput">
          <div className="icon">
            <Search />
          </div>
          <input type="text" placeholder="Search jobs" />
        </div>

        <SecondaryButton onClick={toggle}>Filter</SecondaryButton>
      </div>
      {isOpen && (
        <Sidebar>
          <FilterContainer>
            {CATEGORIES.map(notif => {
              return <li>{notif.title}</li>;
            })}
          </FilterContainer>
        </Sidebar>
      )}
      <StyledPostContainer>
        {data && data.posts && data.posts.edges ? (
          <Posts
            posts={data.posts.edges || []}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  cursor: data.posts.pageInfo.endCursor
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  const newEdges = fetchMoreResult.posts.edges;
                  const pageInfo = fetchMoreResult.posts.pageInfo;
                  return newEdges.length
                    ? {
                        posts: {
                          __typename: prevResult.posts.__typename,
                          edges: [...prevResult.posts.edges, ...newEdges],
                          pageInfo
                        }
                      }
                    : prevResult;
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
  .header-filter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.white};
    padding: 5px;
    border-radius: 5px;
    .searchInput {
      position: relative;
      display: flex;
      flex-direction: row;
      .icon {
        min-width: 30px;
        height: 100%;
        position: relative;
        svg {
          position: absolute;
          display: inline-block;
          stroke: ${props => props.theme.colors.dark};
        }
      }

      input {
        outline: none;
        border: none;
        background-color: ${props => props.theme.colors.lightGrey};
        border-radius: 5px;
        padding: 5px;
      }
    }
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
const StyledPostContainer = styled.div`
  margin: 20px 0;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
`;

export default Feed;
