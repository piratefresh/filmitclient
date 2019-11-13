import React from "react";
import { Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";

import { GET_ME } from "../graphql/queries";

export const withAuthorization = conditionFn => Component => props => (
  <Query query={GET_ME}>
    {({ data, networkStatus }) => {
      console.log(data);
      if (networkStatus < 7) {
        return null;
      }

      return conditionFn(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to={"/login"} />
      );
    }}
  </Query>
);

export const withAuth = conditionFn => Component => props => {
  const { loading, error, data, networkStatus } = useQuery(GET_ME);
  if (loading) return <div>Loading...</div>;
  if (networkStatus < 7) return null;

  return conditionFn(data) ? (
    <Component {...props} />
  ) : (
    <Redirect to={"/login"} />
  );
};
