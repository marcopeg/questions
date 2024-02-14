import { useQuery, gql } from "@apollo/client";

const GET_DASHBOARD = gql`
  query getDashboard {
    get_dashboard {
      data
    }
  }
`;

export const useDashboard = () => {
  const { data } = useQuery(GET_DASHBOARD);
  return data ? data.get_dashboard[0].data : null;
};
