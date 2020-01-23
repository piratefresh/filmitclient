import React from "react";
import { MobileNav } from "../nav/MobileNav";
import { Query } from "react-apollo";
import { GET_ME } from "../../graphql/queries";
import { useStateValue } from "../../contexts";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 64px;
`;

export default ({ children }) => {
  return (
    <Query query={GET_ME}>
      {({ data, refetch }) => (
        <Container>
          <div className="inner-container">{children}</div>
          <MobileNav session={data} refetch={refetch} />
        </Container>
      )}
    </Query>
  );
};
