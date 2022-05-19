import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../LoginScreen/InputValidationScript";
import { CREATE_USER_MUTATION } from "../services/GraphQLOperations";
import { H1 } from "../Components/H1";
import { Button } from "../Components/Button";
import { Form, Caption, Input, TopLabel } from "../Components/Form";
import { Div } from "../Components/AlignCenter";

function NewUserPage() {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
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
        navigate("/users");
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
    setEmailError(validateEmail(email).message);
  };
  return (
    <Div>
      <H1>Criar novo usuário</H1>
      <Form onSubmit={handleSubmit}>
        <TopLabel color="gray">Nome:</TopLabel>
        <Input
          color="gray"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <TopLabel color="gray">Telefone:</TopLabel>
        <Input
          color="gray"
          type="text"
          placeholder="912345678"
          pattern="(^[0-9]*$)"
          onChange={(e) => setTel(e.target.value)}
          required
        />

        <TopLabel color="gray">Data de nascimento:</TopLabel>
        <Input
          color="gray"
          type="date"
          min="1900-01-01"
          onChange={(e) => setBirth(e.target.value)}
          max={date}
          required
        />

        <TopLabel color="gray">Permissão</TopLabel>
        <TopLabel color="gray">
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </TopLabel>

        <Button type="submit">Criar usuário</Button>
      </Form>
    </Div>
  );
}

export default NewUserPage;
