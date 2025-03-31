/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faIdCard } from "@fortawesome/free-solid-svg-icons";

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
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: username,
          password,
        }
      );

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
    <>
      <div className="background-login-container">
        <div className="background-login">
          <img
            src="/background_login.jpg"
            alt="Background"
            className="background-image"
          />
        </div>
      </div>
      <div className="auth-container">
        {/* Tela de Login */}
        <div className="login-title">
          <>Login</>
          <FontAwesomeIcon
            className="login-page-icon"
            icon={faArrowRightToBracket}
            size="sm"
          />
        </div>
        <div className="login-container">
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
            <button className="login-button" type="submit">
              Entrar
            </button>
          </form>
        </div>

        {/* Tela de Registrar */}
        <div className="register-title">
          <>Registrar</>
          <FontAwesomeIcon
            className="register-page-icon"
            icon={faIdCard}
            size="sm"
          />
        </div>
        <div className="register-container">
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
            <button className="register-button" type="submit">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
