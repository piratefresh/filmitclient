import React from "react";

import { withAuth } from "../session/withAuth";

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
  </div>
);

export default withAuth(data => data && data.me)(AccountPage);
