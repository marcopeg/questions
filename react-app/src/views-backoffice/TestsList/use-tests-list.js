import { useQuery, useMutation, gql } from "@apollo/client";

const GET_TESTS = gql`
  query getTests {
    tests {
      id
      name
      icon
      description
    }
  }
`;

const DELETE_TEST = gql`
  mutation deleteTest($id: Int = 1) {
    test: delete_tests_by_pk(id: $id) {
      id
    }
  }
`;

export const useTestsList = () => {
  const { data } = useQuery(GET_TESTS);
  const [deleteTest] = useMutation(DELETE_TEST, {
    refetchQueries: ["getTests"]
  });

  const handleDelete = (item) => () => {
    if (!confirm(`Are you sure you want to delete ${item.name}?`)) return;
    deleteTest({ variables: { id: item.id } });
  };

  return {
    items: data?.tests || [],
    handleDelete
  };
};
