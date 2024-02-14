import { gql } from "@apollo/client";

export const INIT_SIGNING = gql`
  mutation initSignin($email: String!) {
    action: signin_init(args: { email: $email }) {
      data
      name
    }
  }
`;

export const CONFIRM_SIGNING = gql`
  mutation confirmSignin($email: String!, $code: Int!) {
    action: signin_confirm(args: { email: $email, code: $code }) {
      data
      name
    }
  }
`;

export const SIGNIN_WITH_CODE = gql`
  mutation signinWithCode($code: String!) {
    action: signin_with_code(args: { code: $code }) {
      data
      name
    }
  }
`;

export const SIGNIN_FIRST_TIME = gql`
  mutation signinFirstTime($email: String!) {
    action: signin_first_access(args: { email: $email }) {
      data
      name
    }
  }
`;
