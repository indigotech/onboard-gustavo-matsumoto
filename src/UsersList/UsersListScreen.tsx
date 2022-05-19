import { useQuery } from "@apollo/client";
import React from "react";
import { USERS_QUERY } from "../services/GraphQLOperations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListButton } from "../Components/ListButton";
import { FloatingButton } from "../Components/FloatingButton";
import { Button } from "../Components/Button";
import { H1 } from "../Components/H1";

const LIMIT = 50;

function UsersListScreen() {
  const navigate = useNavigate();

  const [offset, setOffset] = useState(0);
  const [userList, setUserList] = useState<any>([]);
  const { data, loading, error } = useQuery(USERS_QUERY, {
    onCompleted: (data) => {
      setUserList([...userList, ...data.users.nodes]);
    },
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
    variables: { offset: offset, limit: LIMIT },
  });
  if (loading) {
    return <H1>Loading</H1>;
  }
  if (error) {
    return <H1>{error.message}</H1>;
  }

  return (
    <div>
      <H1>Lista de usuários</H1>
      {userList.map((user: { name: string; email: string; id: number }) => {
        return (
            <ListButton onClick={() => navigate("/userdetails", {state: user.id})} key={user.id}>
              {user.name}
              <br/>
              {user.email}
            </ListButton>
        );
      })}
      <Button
        onClick={() => {
          setOffset(offset + LIMIT);
        }}
      >
        Load more
      </Button>
      <FloatingButton href="/createuser">+</FloatingButton>
    </div>
  );
}

export default UsersListScreen;
