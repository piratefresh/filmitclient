import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_POSTS, SEARCH_POSTS } from "../graphql/queries";
import Posts from "../components/list/Posts";
import { ErrorMessageContainer } from "../components/container";
import Sidebar from "../components/menu/Sidebar";
import useSidebar from "../components/hooks/useSidebar";
import { useFormik, FormikProvider } from "formik";
import Search from "../icons/Search";
import { CATEGORIES } from "../components/data/constants";
import CheckBox from "../components/form/Checkboxes";
import queryString from "query-string";

import { POST_CREATED } from "../graphql/subscription";
import StyledLink from "../components/link/StyledLink";
import { AddButton, SecondaryButton } from "../components/buttons/buttons";
import {
  Container,
  FilterContainer,
  StyledPostContainer
} from "../components/container/Feed";

function Feed({ history }) {
  const { term, category } = useParams();
  // const params = new URLSearchParams(location.search);
  //   const term = params.get('find_desc');
  //   const locationParam = params.get('find_loc');
  let params = queryString.parse(useLocation().search);
  const { loading, error, data, subscribeToMore, fetchMore } = useQuery(
    GET_POSTS,
    {
      skip: Object.keys(params).length > 0 ? true : false
    }
  );

  const [
    searchPosts,
    { loading: searchLoading, data: searchData, fetchMore: searchFetchMore }
  ] = useLazyQuery(SEARCH_POSTS);

  const formik = useFormik({
    initialValues: {
      term: ""
    },
    onSubmit: ({ term }) => {
      if (term.length > 0) {
        // history.push(`/feed/search/${term}`);
        searchPosts({
          variables: {
            term: params.term ? params.term : "",
            category: params.category ? params.category : ""
          }
        });
      }
    }
  });

  const formik2 = useFormik({
    initialValues: {
      category: ""
    }
  });

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

  // React.useEffect(() => {
  //   if (params.category || params.term) {
  //     searchPosts({
  //       variables: {
  //         query: params.term ? params.term : "",
  //         category: params.category ? params.category : ""
  //       }
  //     });
  //   }
  // }, [params.category, params.term]);

  const { isOpen, toggle } = useSidebar();
  if (searchLoading) return <div>loading..</div>;

  console.log(params);
  return (
    <Container>
      <div className="header">
        <h2>Feed</h2>
        <span>{category}</span>
        {/* <span>{queryString}</span> */}
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
              name="term"
              type="text"
              placeholder="Search jobs"
              onChange={formik.handleChange}
              value={formik.values.term}
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
                <AddButton>Update Feed</AddButton>
              </form>
            </FormikProvider>
          </FilterContainer>
        </Sidebar>
      )}
      <StyledPostContainer>
        {data && data.posts && data.posts.edges ? (
          <Posts
            posts={data.posts.edges}
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
        ) : searchData &&
          searchData.searchPosts &&
          searchData.searchPosts.edges ? (
          <Posts
            posts={searchData.searchPosts.edges}
            onLoadMore={() =>
              searchFetchMore({
                variables: {
                  query: "bobby",
                  cursor: searchData.searchPosts.pageInfo.endCursor
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

export default Feed;
