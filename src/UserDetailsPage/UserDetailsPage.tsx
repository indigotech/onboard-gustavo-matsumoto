import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_DETAILS_QUARY } from "../services/GraphQLOperations";

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
        <h1>Carregando</h1>
      ) : (
        <>
          <label>Nome:</label>
          <li>{data.user.name}</li>
          <br></br>

          <label>Email:</label>
          <li>{data.user.email}</li>
          <br></br>

          <label>ID:</label>
          <li>{data.user.id}</li>
          <br></br>

          <label>Telefone:</label>
          <li>{data.user.phone}</li>
          <br></br>

          <label>Data de Nascimento:</label>
          <li>{data.user.birthDate}</li>
          <br></br>

          <label>Nível de permissão:</label>
          <li>{data.user.role}</li>
          <br></br>

          <button onClick={() => navigate("/users")}>
            Voltar para a lista de usuários
          </button>
        </>
      )}
    </>
  );
}

export default UserDetailsPage;
