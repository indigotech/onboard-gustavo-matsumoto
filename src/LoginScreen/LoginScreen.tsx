import React from "react";
import { validateEmail, validatePassword } from "./InputValidationScript";
import { useState } from "react";
import { LOGIN_MUTATION } from "../services/GraphQLOperations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { H1 } from "../Components/H1";
import { TopLabel, Input, Caption } from "../Components/Form";
import { Div } from "../Components/AlignCenter";
import { Button } from "../Components/Button";
import { Form } from "../Components/Form";

function LoginScreen() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
    if (validateEmail(email).bol && validatePassword(password).bol) {
      loginMutation({
        variables: { email: email, password: password },
      });
    }
    setEmailError(validateEmail(email).message);
    setPasswordError(validatePassword(password).message);
  };
  return (
    <Div>
      <H1>Bem-vindo(a) à Taqtile!</H1>
      <Form onSubmit={handleSubmit}>
        {emailError != "" ? (
          <>
            <TopLabel color="red">E-mail</TopLabel>
            <Input
              color="red"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <TopLabel color="gray">E-mail</TopLabel>
            <Input
              color="gray"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        )}
        <Caption>{emailError}</Caption>
        {passwordError != "" ? (
          <>
            <TopLabel color="red">Senha</TopLabel>
            <Input
              color="red"
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <TopLabel color="gray">Senha</TopLabel>
            <Input
              color="gray"
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        )}

        <Caption>{passwordError}</Caption>
        <Button type="submit" disabled={loading}>
          {loading ? "Carregando" : "Entrar"}
        </Button>
      </Form>
    </Div>
  );
}

export default LoginScreen;
