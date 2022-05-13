import { useQuery } from "@apollo/client";
import React from "react";
import { USERS_QUERY } from "../services/GraphQLOperations";
import { useState } from "react";

const LIMIT = 50;

function UsersListScreen() {
  const [offset, setOffset] = useState(0);
  const [userList, setUserList] = useState<any>([]);
  const { data, loading, error } = useQuery(USERS_QUERY, {
    onCompleted: (data) => {
      setUserList(data.users.nodes);
    },
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
      {userList.map((user: { name: string; email: string; id: string }) => {
        return (
          <li key={user.id}>
            {user.name}
            {"\n"}
            {user.email}
          </li>
        );
      })}
      <button
        onClick={() => {
          setUserList([...userList, ...data.users.nodes]);
          setOffset(offset + LIMIT);
        }}
      >
        Load more
      </button>
    </div>
  );
}

export default UsersListScreen;
