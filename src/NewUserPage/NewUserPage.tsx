import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../LoginScreen/InputValidationScript";
import { CREATE_USER_MUTATION } from "../services/GraphQLOperations";

function NewUserPage() {

    const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [birth, setBirth] = useState(Date);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [createUserMutation, { data, loading, error }] = useMutation(
    CREATE_USER_MUTATION,
    {
      context: {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
      onError: (error) => {
        if (error.graphQLErrors != null) {
          alert(error?.message);
        } else {
          alert("Um erro ocorreu, tente novamente mais tarde");
        }
      },
      onCompleted: () => {
        navigate("/users")
      },
    }
  );
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateEmail(email)) {
      createUserMutation({
        variables: {
            name,
            email,
            phone: tel,
            birthDate: birth,
            role,
        },
      });
    }
  };
  return (
    <div>
      <h1>Criar novo usuário</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} required />

        <label>E-mail:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Telefone:</label>
        <input
          type="text"
          placeholder="912345678"
          pattern="(^[0-9]*$)"
          onChange={(e) => setTel(e.target.value)}
          required
        />

        <label>Data de nascimento:</label>
        <input
          type="date"
          min="1900-01-01"
          onChange={(e) => setBirth(e.target.value)}
          max={date}
          required
        />

        <label>Permissão</label>
        <label>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>

        <button type="submit">Criar usuário</button>
      </form>
    </div>
  );
}

export default NewUserPage;
