import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS, GET_ME, GET_RECENT_POSTS } from "../graphql/queries";
import styled from "styled-components";
import Posts from "../components/list/Posts";

function Home() {
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    GET_USERS
  );
  const { loading: meLoading, error: meError, data: meData } = useQuery(GET_ME);
  const {
    loading: postsLoading,
    error: postsError,
    data: postsData
  } = useQuery(GET_RECENT_POSTS);
  if (meLoading || userLoading || postsLoading) return <p>Loading ...</p>;

  if (!meData) return <div>No User Data</div>;
  return (
    <Container>
      <h2>Home</h2>
      {userData &&
        userData.users.map((user, i) => {
          return <li key={i}>{user.username}</li>;
        })}
      <h2>Most Recent Posts</h2>
      <Posts posts={postsData.getRecentPosts}></Posts>
    </Container>
  );
}

const Container = styled.div`
  padding: 5%;
`;

export default Home;
