import { useLocation } from "react-router-dom";
// A custom hook that builds on useLocation to parse
// the query string for you.
// Not working on IE it seems
export function useQueryString() {
  const params = new URLSearchParams(useLocation().search);
  const queries = [...params.entries()];
  return queries;
}
