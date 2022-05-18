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
        id
        name
        email
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation (
    $name: String!
    $email: String!
    $phone: String!
    $birthDate: Date!
    $role: UserRole!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        phone: $phone
        birthDate: $birthDate
        role: $role
      }
    ) {
      id
    }
  }
`;

export const USER_DETAILS_QUARY = gql`
  query ($id: ID!){
    user(id: $id){
      name
      email
      id
      role
      phone
      birthDate
    }
  }
`