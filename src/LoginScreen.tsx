import React from "react";

function loginScreen() {
  return (
    <>
      <h1>
        Bem-vindo(a) à Taqtile!
      <h1/>
      </h1>
    <form>
      <label>
        E-mail
      </label>
      <input type="text"/>
      <label>
        Senha
      </label>
      <input type="password"/>
      <button> Entrar</button>
    </form>
  </>
  );
}

export default loginScreen
