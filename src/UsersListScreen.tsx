import { useQuery } from "@apollo/client";
import React from "react";
import { USERS_QUERY } from "./services/GraphQLOperations";
import "./UserList"
import userList from "./UserList";


const UserMap = userList.users.map((user)=> <li key = {user.name}>{user.name}{'\n'}{user.email} </li>);

function UsersListScreen() {
  const {loading, error, data} = useQuery(USERS_QUERY)
  return <div>{UserMap}</div>;
}


export default UsersListScreen;