import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../graphql/queries";

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

export const PrivatRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return <div>Loading User data...</div>;
  return (
    <Route
      {...rest}
      render={props =>
        data.me ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
