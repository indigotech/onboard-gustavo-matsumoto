import React from "react";
import { validateEmail, validatePassword } from "./InputValidationScript";
import { useState } from "react";
import { LOGIN_MUTATION } from "../services/GraphQLOperations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { data, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      localStorage.setItem("token", login.token);
      navigate("/users");
    },
    onError: (error) => {
      if (error.graphQLErrors != null) {
        alert(error?.message);
      } else {
        alert("Um erro ocorreu, tente novamente mais tarde");
      }
    },
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      loginMutation({
        variables: { email: email, password: password },
      });
    }
  };
  return (
    <>
      <h1>Bem-vindo(a) à Taqtile!</h1>
      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Senha</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Carregando" : "Entrar"}
        </button>
      </form>
    </>
  );
}

export default LoginScreen;
