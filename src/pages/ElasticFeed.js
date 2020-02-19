/*global google*/
import React from "react";
import { useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { SEARCH_POSTS } from "../graphql/queries";
import Posts from "../components/list/Posts";
import { ErrorMessageContainer } from "../components/container";
import Sidebar from "../components/menu/Sidebar";
import useSidebar from "../components/hooks/useSidebar";
import { usePosition } from "../components/hooks/usePosition";
import { useFormik, FormikProvider } from "formik";
import Search from "../icons/Search";
import { CATEGORIES } from "../components/data/constants";
import { Checkbox } from "../components/form/Checkbox";
import queryString from "query-string";
import Geosuggest from "react-geosuggest";
import { useStateValue } from "../contexts/";
import { validateCategory, validateLatLon } from "../utils/isEmpty";
import { POST_CREATED } from "../graphql/subscription";
import StyledLink from "../components/link/StyledLink";
import { AddButton, SecondaryButton } from "../components/buttons/buttons";
import {
  Container,
  FilterContainer,
  StyledPostContainer
} from "../components/container/Feed";

function ElasticFeed({ history }) {
  const [{ location }, dispatch] = useStateValue();
  let params = queryString.parse(useLocation().search);
  const { latitude, longitude } = usePosition();
  const [state, setState] = React.useState({
    term: params.term ? params.term : "",
    lat: latitude ? latitude : parseFloat(params.lat),
    lon: longitude ? longitude : parseFloat(params.lon),
    category: params.category ? [params.category] : []
  });
  const [
    searchPosts,
    { loading, data, fetchMore, subscribeToMore }
  ] = useLazyQuery(SEARCH_POSTS);

  const formik = useFormik({
    initialValues: {
      term: "",
      category: "",
      lat: state.lat ? state.lat : null,
      lon: state.lon ? state.lon : null
    },
    onSubmit: async ({ term, category, lat, lon }) => {
      // Set the new queries into state and update the url
      // useEffect below is dependent on paramTerm and paramCat
      // Forces refetch of data everytime they change
      await setState({
        term,
        category: category ? category : "",
        lat: lat ? lat : state.lat,
        lon: lon ? lon : state.lon
      });
      history.push(
        `/elasticfeed?${term && "term=" + term}${
          validateCategory(category) ? "&category=" + category : ""
        }${
          !validateLatLon(state.lat, state.lon)
            ? "&loc=" + state.lat + state.lon
            : ""
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
          if (postCreated === null) return previousResult;
          return {
            searchPosts: {
              __typename: previousResult.searchPosts.__typename,
              edges: [postCreated, ...previousResult.searchPosts.edges],
              pageInfo: previousResult.searchPosts.pageInfo
            }
          };
        }
      });
    }
  }, [subscribeToMore]);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      lat: latitude,
      lon: longitude
    }));
    dispatch({
      type: "changeLocation",
      newLocation: { lat: latitude, lon: longitude }
    });
  }, [latitude, longitude]);

  React.useEffect(() => {
    // Everytime term and cate queries get updated, fetch data
    console.log(state.lat);
    return searchPosts({
      variables: {
        term: state.term,
        category: state.category ? state.category : "",
        lat: state.lat,
        lon: state.lon
      }
    });
  }, [searchPosts, state.lon, state.lat, state.term, state.category]);

  function onSuggestSelect(suggest) {
    if (suggest) {
      const {
        location: { lat, lng },
        label
      } = suggest;
      formik.setValues({
        ...formik.values,
        lat: lat,
        lon: lng,
        location: label
      });
    }
  }

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
                <Geosuggest
                  onSuggestSelect={onSuggestSelect}
                  // onSuggestNoResults={onSuggestNoResults}
                  placeholder="City or Zip"
                  location={
                    new google.maps.LatLng(
                      latitude ? latitude : 53.558572,
                      longitude ? longitude : 9.9278215
                    )
                  }
                  types={["(regions)"]}
                  country={["us", "ca"]}
                  radius={20}
                />
                <AddButton type="submit">Update Feed</AddButton>
              </FilterContainer>
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
                  term: state.term,
                  lat: state.lat,
                  lon: state.lon,
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
