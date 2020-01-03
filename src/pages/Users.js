import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { GET_USERS, GET_ME, GET_QUERY_USERS } from "../graphql/queries";
import { UploadAvatar } from "../components/FileUpload";
import UserList from "../components/list/Users";

function Users() {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
    fetchMore
  } = useQuery(GET_QUERY_USERS);
  const { loading: meLoading, error: meError, data: meData } = useQuery(GET_ME);
  if (meLoading || userLoading) return <p>Loading ...</p>;
  console.log(meError);

  if (!userData) return <div>No User Data</div>;
  return (
    <Container>
      <h2>Users</h2>
      <UserList
        users={userData.queryUsers.edges || []}
        onLoadMore={() =>
          fetchMore({
            variables: {
              cursor: userData.queryUsers.pageInfo.endCursor
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.queryUsers.edges;
              const pageInfo = fetchMoreResult.queryUsers.pageInfo;
              return newEdges.length
                ? {
                    queryUsers: {
                      __typename: prevResult.queryUsers.__typename,
                      edges: [...prevResult.queryUsers.edges, ...newEdges],
                      pageInfo
                    }
                  }
                : prevResult;
            }
          })
        }
      />
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

export default Users;
