import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_DETAILS_QUARY } from "../services/GraphQLOperations";
import { H1 } from "../Components/H1";
import { Button } from "../Components/Button";
import { DetailsBox } from "../Components/DetailsBox";
import { Text } from "../Components/Text";

function UserDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state;

  const { loading, error, data } = useQuery(USER_DETAILS_QUARY, {
    onError: (error) => {
      if (error.graphQLErrors != null) {
        alert(error?.message);
      } else {
        alert("Um erro ocorreu, tente novamente mais tarde");
      }
    },
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
    variables: {
      id: id,
    },
  });

  return (
    <>
      {loading ? (
        <H1>Carregando</H1>
      ) : (
        <DetailsBox>
          <H1>Detalhes:</H1>

          <label>Nome: </label>
          <Text>{data.user.name}</Text>
          <br></br>

          <label>Email: </label>
          <Text>{data.user.email}</Text>
          <br></br>

          <label>ID: </label>
          <Text>{data.user.id}</Text>
          <br></br>

          <label>Telefone: </label>
          <Text>{data.user.phone}</Text>
          <br></br>

          <label>Data de Nascimento: </label>
          <Text>{data.user.birthDate}</Text>
          <br></br>

          <label>Nível de permissão: </label>
          <Text>{data.user.role}</Text>
          <br></br>

          <Button onClick={() => navigate("/users")}>
            Voltar para a lista de usuários
          </Button>
        </DetailsBox>
      )}
    </>
  );
}

export default UserDetailsPage;
