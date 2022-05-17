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

// mutation {
  
//   createUser(
//     data: {
//       name: "joao"
//       email: "joao@joao.com"
//       phone: "91234-5678"
//       birthDate: "2000-01-01"
//       role: admin
//     }
//   ) {
//     id
//   }
// }

