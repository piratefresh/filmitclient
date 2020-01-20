import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS, SEARCH_POSTS } from "../graphql/queries";

export const useFeedApi = (term, category) => {
  const [amountResults, setAmountResults] = useState();
  const [searchParams, setSearchParams] = useState({ term, category });

  React.useEffect(() => {
    const { loading, error, data, subscribeToMore, fetchMore } = useQuery(
      GET_POSTS
    );
  }, []);

  return {
    data,
    subscribeToMore,
    fetchMore
  };
};
