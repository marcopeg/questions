import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useForm } from "../../utils";

const GET_TEST = gql`
  query getTestWithQuestions(
    $id: Int!
    $max_number: Int!
    $category_percentage: jsonb!
  ) {
    test: tests_by_pk(id: $id) {
      name
      categories {
        id
        name
      }
    }
    questions: get_random_questions(
      args: {
        test_id: $id
        max_number: $max_number
        distribution: $category_percentage
      }
    ) {
      id
      text
      category_id
      answers {
        id
        text
      }
    }
  }
`;

const SUBMIT_RESULTS = gql`
  mutation submitResults($id: Int!, $answers: json!) {
    results: submit_results(args: { test_id: $id, user_answers: $answers }) {
      user_id
      test_id
      score
      results
      id
      data
      created_at
    }
  }
`;

const getFieldId = (q) => `q${q.id}`;

const validateNotEmpty = () => (str) => {
  if (str) return null;
  return `Please select a value`;
};

const validateAnswer = (question) => (value, _field) =>
  question.answers.map(($) => String($.id)).includes(value)
    ? null
    : "Invalid answer";

const useFormSettings = () => {
  const { id, settings: _settings } = useParams();
  const { t, d } = JSON.parse(decodeURIComponent(_settings));

  return {
    id,
    max_number: t,
    category_percentage: d
  };
};

export const useTrainQuestions = () => {
  const variables = useFormSettings();

  const { data } = useQuery(GET_TEST, {
    variables
  });

  const [submitResults] = useMutation(SUBMIT_RESULTS, {
    variables: { id: variables.id }
  });

  const questions = !data
    ? []
    : data.questions.map(($) => ({ ...$, _fieldId: getFieldId($) }));

  const form = useForm(
    !data
      ? {}
      : data.questions.reduce(
          (acc, question) => ({
            ...acc,
            [getFieldId(question)]: {
              type: "radio",
              validate: [validateNotEmpty(question), validateAnswer(question)]
            }
          }),
          {}
        )
  );

  const submit = (answers) =>
    submitResults({ variables: { answers } })
      .then((res) => res.data.results[0])
      .catch((err) => {
        console.log(err);
      });

  return {
    title: data?.test?.name,
    subtitle: data ? `${data.questions.length} domande` : null,
    questions,
    form,
    submit
  };
};
