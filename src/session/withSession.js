import React from "react";
import { Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../graphql/queries";

const withSession = Component => props => (
  <Query query={GET_ME}>
    {({ data, refetch }) => {
      console.log(data);
      return <Component {...props} session={data} refetch={refetch} />;
    }}
  </Query>
);

export default withSession;
