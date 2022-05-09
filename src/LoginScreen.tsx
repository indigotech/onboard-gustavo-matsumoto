import React from "react";
import validateForm from "./InputValidationScript";
import { useState } from "react";
import e from "express";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1>
        Bem-vindo(a) à Taqtile!
        <h1 />
      </h1>
      <form>
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
        <button onClick={() => validateForm(email, password)}>Entrar</button>
      </form>
    </>
  );
}

export default LoginScreen;
