import { useQuery, gql } from "@apollo/client";

const GET_TESTS = gql`
  query getTests {
    tests {
      id
      name
      description
      icon
      stats {
        avg_score
        completion
        tot_results
      }
    }
  }
`;

export const useChooseTest = () => {
  const { loading, data } = useQuery(GET_TESTS);

  return {
    loading,
    items: data?.tests || []
  };
};
