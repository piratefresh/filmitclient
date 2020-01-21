import React from "react";
import { useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { SEARCH_POSTS } from "../graphql/queries";
import Posts from "../components/list/Posts";
import { ErrorMessageContainer } from "../components/container";
import Sidebar from "../components/menu/Sidebar";
import useSidebar from "../components/hooks/useSidebar";
import { useFormik, FormikProvider } from "formik";
import Search from "../icons/Search";
import { CATEGORIES } from "../components/data/constants";
import { Checkbox } from "../components/form/Checkbox";
import queryString from "query-string";

import { POST_CREATED } from "../graphql/subscription";
import StyledLink from "../components/link/StyledLink";
import { AddButton, SecondaryButton } from "../components/buttons/buttons";
import {
  Container,
  FilterContainer,
  StyledPostContainer
} from "../components/container/Feed";

function ElasticFeed({ history }) {
  let params = queryString.parse(useLocation().search);
  const [paramCat, setParamCat] = React.useState(
    params.category ? [params.category] : null
  );
  const [paramTerm, setParamTerm] = React.useState(params.term);
  const [
    searchPosts,
    { loading, data, fetchMore, subscribeToMore }
  ] = useLazyQuery(SEARCH_POSTS);

  const formik = useFormik({
    initialValues: {
      term: "",
      category: []
    },
    onSubmit: ({ term, category }) => {
      // Set the new queries into state and update the url
      // useEffect below is dependent on paramTerm and paramCat
      // Forces refetch of data everytime they change
      setParamTerm(term);
      setParamCat(category);
      history.push(
        `/elasticfeed?${term && "term=" + term}&${
          category.length > 0 ? "category=" + category : ""
        }`
      );
    }
  });

  React.useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore({
        document: POST_CREATED,
        updateQuery: (previousResult, { subscriptionData }) => {
          // If the subscription data does not exist
          // Simply return the previous data
          if (!subscriptionData.data) return previousResult;
          const { postCreated } = subscriptionData.data;
          return {
            posts: {
              ...previousResult.searchPosts,
              edges: [postCreated, ...previousResult.searchPosts.edges]
            }
          };
        }
      });
    }
  }, [subscribeToMore]);

  React.useEffect(() => {
    // Everytime term and cate queries get updated, fetch data
    searchPosts({
      variables: { term: paramTerm, category: paramCat }
    });
  }, [paramTerm, paramCat]);

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
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="header-filter">
            <div className="searchInput">
              <div className="icon">
                <Search />
              </div>
              <input
                name="term"
                type="text"
                placeholder="Search jobs"
                onChange={formik.handleChange}
                value={formik.values.term}
              />
            </div>
            <SecondaryButton type="button" onClick={toggle}>
              Filter
            </SecondaryButton>
          </div>
          {isOpen && (
            <Sidebar>
              <FilterContainer>
                {CATEGORIES.map(notif => {
                  return (
                    <Checkbox
                      name="category"
                      notif={notif}
                      value={notif.value}
                      key={notif.key}
                      formik={formik}
                    />
                  );
                })}
              </FilterContainer>
              <button type="submit">Update Feed</button>
            </Sidebar>
          )}
        </form>
      </FormikProvider>
      <StyledPostContainer>
        {data && data.searchPosts && data.searchPosts.edges ? (
          <Posts
            posts={data.searchPosts.edges}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  term: paramTerm,
                  cursor: data.searchPosts.pageInfo.endCursor
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  const newEdges = fetchMoreResult.searchPosts.edges;
                  const pageInfo = fetchMoreResult.searchPosts.pageInfo;
                  return newEdges.length
                    ? {
                        searchPosts: {
                          __typename: prevResult.searchPosts.__typename,
                          edges: [...prevResult.searchPosts.edges, ...newEdges],
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

export default ElasticFeed;
