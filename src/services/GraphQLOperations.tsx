import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        id
        name
      }
    }
  }
`;