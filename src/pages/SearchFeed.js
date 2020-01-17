import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_POSTS, SEARCH_POSTS } from "../graphql/queries";
import Posts from "../components/list/PostsNoScroll";
import { ErrorMessageContainer } from "../components/container";
import Sidebar from "../components/menu/Sidebar";
import useSidebar from "../components/hooks/useSidebar";
import { useFormik } from "formik";
import Search from "../icons/Search";
import { CATEGORIES } from "../components/data/constants";

import { POST_CREATED } from "../graphql/subscription";
import StyledLink from "../components/link/StyledLink";
import { AddButton, SecondaryButton } from "../components/buttons/buttons";

function SearchFeed({ history }) {
  let { query } = useParams();
  const { called, loading, data } = useQuery(SEARCH_POSTS, {
    variables: {
      query
    }
  });

  const formik = useFormik({
    initialValues: {
      query: ""
    },
    onSubmit: ({ query }) => {
      if (query.length > 0) {
        history.push(`/feed/search/${query}`);
      }
    }
  });

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
        <form onSubmit={formik.handleSubmit}>
          <div className="searchInput">
            <div className="icon">
              <Search />
            </div>
            <input
              name="query"
              type="text"
              placeholder="Search jobs"
              onChange={formik.handleChange}
              value={formik.values.query}
            />
          </div>
        </form>

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
        {data && data.searchPosts ? (
          <Posts posts={data.searchPosts || []}></Posts>
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

export default SearchFeed;
