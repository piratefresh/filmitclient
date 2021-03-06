import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH_POSTS } from "../graphql/queries";
import Posts from "../components/list/PostsNoScroll";
import { ErrorMessageContainer } from "../components/container";
import Sidebar from "../components/menu/Sidebar";
import useSidebar from "../components/hooks/useSidebar";
import { useFormik, FormikProvider } from "formik";
import Search from "../icons/Search";
import { CATEGORIES } from "../components/data/constants";
import CheckBox from "../components/form/Checkboxes";

import StyledLink from "../components/link/StyledLink";
import { AddButton, SecondaryButton } from "../components/buttons/buttons";
import {
  Container,
  FilterContainer,
  StyledPostContainer
} from "../components/container/Feed";

function SearchFeed({ history }) {
  let { query } = useParams();
  const { called, loading, data, client } = useQuery(SEARCH_POSTS, {
    variables: {
      query
    },
    onCompleted({ searchPosts }) {
      client.writeData({ data: { posts: searchPosts } });
    }
  });

  const formik = useFormik({
    initialValues: {
      query: ""
    },
    onSubmit: ({ query }) => {
      if (query.length > 0) {
        history.push(`/feed/search/${query}`);
      } else {
        history.push(`/feed`);
      }
    }
  });

  const formik2 = useFormik({
    initialValues: {
      category: ""
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
            <FormikProvider value={formik2}>
              <form onSubmit={formik2.handleSubmit}>
                {CATEGORIES.map(notif => {
                  return (
                    <CheckBox
                      name="category"
                      notif={notif}
                      key={notif.key}
                      setFieldValue={formik2.setFieldValue}
                    />
                  );
                })}
              </form>
            </FormikProvider>
          </FilterContainer>
        </Sidebar>
      )}
      <StyledPostContainer>
        {data && data.posts ? (
          <Posts posts={data.posts || []}></Posts>
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

export default SearchFeed;
