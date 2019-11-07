import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Card } from "../components/card";

const GET_USERS = gql`
  query getUsers {
    posts {
      edges {
        title
        text
      }
    }
  }
`;

function Feed() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading ...</p>;
  console.log(data);
  return (
    <div>
      <Card data={data} />
    </div>
  );
}

export default Feed;
