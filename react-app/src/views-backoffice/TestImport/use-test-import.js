import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useForm, asJSON } from "../../utils";

const GET_TESTS = gql`
  query getTests($id: Int!) {
    test: tests_by_pk(id: $id) {
      id
      name
    }
  }
`;

const CREATE_TEST = gql`
  mutation createTest {
    test: insert_tests_one(object: {}) {
      id
    }
  }
`;

const IMPORT_TEST = gql`
  mutation importTest($par_test_id: Int!, $json_data: json!) {
    result: import_test(
      args: { par_test_id: $par_test_id, json_data: $json_data }
    ) {
      data
    }
  }
`;

export const useTestImport = () => {
  const { id } = useParams();

  const { data } = useQuery(GET_TESTS, { variables: { id: Number(id) } });
  const [createTest] = useMutation(CREATE_TEST);
  const [importTest] = useMutation(IMPORT_TEST, {
    refetchQueries: ["getTests"]
  });

  const form = useForm({
    data: {
      validate: asJSON,
      defaultValue: `{}`
    }
  });

  const apply = async () => {
    if (!form.isValid()) return;

    // Create a new test if no id is provided
    let _id = id;
    if (!_id) {
      const res = await createTest();
      _id = res.data.test.id;
    }

    // Import the json document into the test
    return importTest({
      variables: {
        par_test_id: Number(_id),
        json_data: JSON.parse(form.getValue("data"))
      }
    });
  };

  return {
    id,
    title: id ? "Re-Import Test Data" : "Import Test Data",
    subtitle: data?.test?.name,
    form,
    apply
  };
};
