import React from "react";
import "./UserList"
import userList from "./UserList";


const UserMap = userList.users.map((user)=> {return(<li key = {user.name}>{user.name}{'\n'}{user.email} </li>)});

function UsersListScreen() {
  return <div>{UserMap}</div>;
}


export default UsersListScreen;