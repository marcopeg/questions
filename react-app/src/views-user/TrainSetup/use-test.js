import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_TEST = gql`
  query getTest($id: Int = 5) {
    test: tests_by_pk(id: $id) {
      name
      description
      icon
      default_num_questions
      stats {
        avg_score
        completion
        tot_results
      }
      categories {
        id
        name
        default_distribution
      }
    }
  }
`;

const ensureTotal = (obj) => {
  // Calculate the total sum of all values
  const totalSum = Object.values(obj).reduce(
    (sum, current) => sum + current,
    0
  );

  // If the sum is greater than 100, adjust the last key's value
  if (totalSum !== 100) {
    const keys = Object.keys(obj);
    const lastKey = keys[keys.length - 1];
    obj[lastKey] -= totalSum - 100; // Adjust the last key's value
  }

  return obj;
};

export const useTest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, data } = useQuery(GET_TEST, { variables: { id } });
  const [questionsNum, setQuestionsNum] = useState(2);
  const [amounts, setAmounts] = useState({});

  // Import the amounts
  useEffect(() => {
    if (!data?.test?.categories) return;

    setQuestionsNum(data.test.default_num_questions || 20);

    const newAmounts = data.test.categories.reduce((acc, category) => {
      acc[category.id] =
        category.default_distribution ||
        Math.floor(100 / data.test.categories.length);
      return acc;
    }, {});

    setAmounts(ensureTotal(newAmounts));
  }, [data]);

  // Getters and setters for the amounts:
  const getAmount = (id) => amounts[id] || 0;
  const setAmount = (id) => (event) => {
    const newAmounts = { ...amounts, [id]: Number(event.target.value) };
    setAmounts(ensureTotal(newAmounts));
  };

  const confirmAmounts = () => {
    const encoded = encodeURIComponent(
      JSON.stringify({ t: questionsNum, d: amounts })
    );
    navigate(`/train/${id}/${encoded}`);
  };

  return {
    loading,
    icon: data?.test?.icon,
    name: data?.test?.name || "...",
    description: data?.test?.description || "...",
    categories: data?.test?.categories || [],
    stats: data?.test?.stats,
    questionsNum,
    setQuestionsNum: (event) => setQuestionsNum(Number(event.target.value)),
    getAmount,
    setAmount,
    confirmAmounts
  };
};
