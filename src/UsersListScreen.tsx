import React from "react";
import "./UserList";
import userList from "./UserList";

function UsersListScreen() {
  return (
    <div>
      {userList.users.map((user) => {
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
