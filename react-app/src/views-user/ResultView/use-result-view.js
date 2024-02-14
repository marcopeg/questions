import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_RESULT = gql`
  query getResult($id: Int!) {
    result: results_by_pk(id: $id) {
      created_at
      score
      data
      results
      test {
        name
        description
        icon
      }
    }
  }
`;

export const useResultView = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_RESULT, { variables: { id } });

  const categories = data
    ? data.result.data.categories.reduce(
        (a, c) => ({
          ...a,
          [c.id]: c
        }),
        {}
      )
    : {};

  const questions = data
    ? data.result.data.questions.reduce(
        (a, c) => ({
          ...a,
          [c.id]: c
        }),
        {}
      )
    : {};

  return {
    loading,
    data: {
      ...(data?.result || {}),
      categories,
      questions
    }
  };
};
