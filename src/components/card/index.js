import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";

export const Card = ({ data }) => {
  return (
    <CardContainer>
      {data.posts.edges.map(post => {
        return (
          <>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </>
        );
      })}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 90%;
  height: 200px;
`;
