/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate(); 

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: username,
        password,
      });

      if (response.status === 200) {
        alert("Login bem-sucedido!");
        console.log("Usuário logado:", response.data);

        //Salva o token de autenticação no localStorage
        localStorage.setItem("authToken", response.data.user.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(error.response?.data?.error || "Erro ao fazer login.");
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password: registerPassword,
      });

      if (response.status === 201) {
        alert("Usuário registrado com sucesso!");
        console.log("Usuário registrado:", response.data);

        setName("");
        setEmail("");
        setRegisterPassword("");
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert(error.response?.data?.error || "Erro ao registrar o usuário.");
    }
  };

  return (
    <div className="auth-container">
      {/* Tela de Login */}
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>

      {/* Tela de Registrar-se */}
      <div className="register-container">
        <h1>Registrar-se</h1>
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="registerPassword">Senha</label>
            <input
              type="password"
              id="registerPassword"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;