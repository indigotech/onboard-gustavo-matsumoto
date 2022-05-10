import React from "react";
import validateForm from "./InputValidationScript";
import { useState } from "react";
import { LOGIN_MUTATION } from "./services/GraphQLOperations";
import { ApolloProvider, useMutation } from "@apollo/client";
import { client } from "./index";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginMutation, { data, loading, error }] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted: ({ login }) => {
        localStorage.setItem("token", login.token); 
        console.log("login successful");
      },
    }
  );
  return (
    <ApolloProvider client={client}>
      <h1>Bem-vindo(a) à Taqtile!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          LoginMutation({
            variables: { email: email, password: password },
          });
          if (error) {
            console.log(data);
          }
        }}
      >
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
        <button type="submit" onClick={() => validateForm(email, password)}>
          Entrar
        </button>
      </form>
    </ApolloProvider>
  );
}

export default LoginScreen;
