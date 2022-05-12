import { useQuery, useLazyQuery } from "@apollo/client";
import React from "react";
import "./UserList";
import { USERS_QUERY } from "./services/GraphQLOperations";
import "./UserList";

const LIMIT = 10;
const offset = 0;

function UsersListScreen() {
  const { data, loading, error } = useQuery(USERS_QUERY, {
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
    variables: { offset: offset, limit: LIMIT },
  });
  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {data.users.nodes.map((user: { name: string; email: string }) => {
        return (
          <li key={user.name}>
            {user.name}
            {"\n"}
            {user.email}
          </li>
        );
      })}
    </div>
  );
}

export default UsersListScreen;
