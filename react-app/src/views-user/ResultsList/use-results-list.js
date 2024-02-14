import { useQuery, gql } from "@apollo/client";

const GET_RESULTS = gql`
  query getResults {
    results(order_by: { created_at: desc }) {
      id
      score
      created_at
      test {
        name
        icon
      }
    }
  }
`;

export const useResultsList = () => {
  const { loading, data } = useQuery(GET_RESULTS);

  return {
    loading,
    items: data?.results || []
  };
};
