import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        id
        name
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query Users($offset: Int, $limit: Int) {
    users(pageInfo: { offset: $offset, limit: $limit }) {
      nodes {
        name
        email
      }
    }
  }
`;
