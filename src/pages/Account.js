import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../graphql/queries";

import { withAuth } from "../session/withAuth";
import { Avatar } from "../components/avatar";

const AccountPage = props => {
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return <div>Loading...</div>;
  if (error) return console.log(error);
  return (
    <div>
      <h1>Account Page</h1>
      <Avatar
        src={`http://localhost:8000/myAvatars/${data.me.id}`}
        alt={`Avatar for ${data.me.email}`}
      />
      <span>{data.me.email}</span>
    </div>
  );
};

export default withAuth(data => data && data.me)(AccountPage);
