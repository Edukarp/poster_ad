import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/questions", {
        question,
      });
      setMessage(response.data.message);
      setQuestion("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "40px"; //Resetar a altura para o padrão
      }
    } catch (error) {
      setMessage("Erro ao salvar a pergunta.");
    }
  };

  return (
    <>
      <div className="background"></div>
      <div className="login-button-container">
        <button className="login-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
      <div className="home-container">
        <div className="title">
          <h1>Tudo em todo lugar ao mesmo tempo</h1>
          <div className="content-container">
            <img className="banner-image" src="/banner1.jpeg" alt="Filme" />
            <div className="text-block">
              <p className="topic-title">SINOPSE</p>
              <p className="simple-text">
                Uma ruptura interdimensional bagunça a realidade e uma
                inesperada heroína precisa usar seus novos poderes para lutar
                contra os perigos bizarros do multiverso.
              </p>
              <div style={{ display: "flex", gap: "30px", marginTop: "-15px" }}>
                <div>
                  <p className="topic-title">GENERO</p>
                  <p className="simple-text">Ação/Ficção Científica</p>
                </div>
                <div>
                  <p className="topic-title">LANÇAMENTO</p>
                  <p className="simple-text">2022</p>
                </div>
              </div>
              <p className="topic-title">DISPONIVEL EM:</p>
              <div className="logos-container">
                <a
                  href="https://play.max.com/movie/68b16b1a-fee0-48b2-886f-39f51832725d?utm_source=universal_search"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="logo-image"
                    src="/max_logo.png"
                    alt="Logo da MAX"
                  />
                </a>
                <a
                  href="https://www.primevideo.com/dp/amzn1.dv.gti.ce3a3b69-10a1-4bfc-8459-1b48bce3a53e?autoplay=0&ref_=atv_cf_strg_wb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="logo-image"
                    src="/prime_logo.png"
                    alt="Logo do Amazon Prime"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="question-container">
            <p className="topic-question">Faça sua pergunta sobre o filme:</p>
            <form onSubmit={handleSubmit}>
              <textarea
                ref={textareaRef}
                placeholder="Escreva sua pergunta sobre o filme aqui..."
                value={question}
                onChange={handleInputChange}
                className="question-textarea"
              />
              <div className="submit-container">
                <button type="submit" className="submit-button">
                  Enviar
                  <FontAwesomeIcon
                    className="submit-icon"
                    icon={faArrowRight}
                    size="sm"
                  />
                </button>
              </div>
            </form>
          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Home;
