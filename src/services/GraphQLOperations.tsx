import { gql } from "@apollo/client";

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

export const USERS_QUERY = gql`
query($id: ID!){
  user(id: $id){
    name
    email
  }
}
`