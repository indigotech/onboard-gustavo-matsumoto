import { useQuery } from "@apollo/client";
import React from "react";
import { USERS_QUERY } from "../services/GraphQLOperations";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {userList.map((user: { name: string; email: string; id: number }) => {
        return (
          <li key={user.id}>
            <ListUser onClick={() => navigate("/userdetails", {state: user.id})}>
              {user.name}
              {"\n"}
              {user.email}
            </ListUser>
          </li>
        );
      })}
      <button
        onClick={() => {
          setOffset(offset + LIMIT);
        }}
      >
        Load more
      </button>
      <FloatingButton href="/createuser">+</FloatingButton>
    </div>
  );
}

const ListUser = styled.button`
  margin: 2px;
`;

const FloatingButton = styled.a`
  position: fixed;
  right: 2%;
  top: 90%;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  background-color: black;
  color: white;
  font-size: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

export default UsersListScreen;
