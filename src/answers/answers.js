/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./answers.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPencil } from "@fortawesome/free-solid-svg-icons";

const Answers = () => {
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const textareaRef = useRef(null); //Referência para o textarea

  const navigate = useNavigate();

  // Função para buscar todas as perguntas
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://poster-adbackend.vercel.app/api/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Erro ao buscar as perguntas:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Função para atualizar a resposta
  const handleUpdateAnswer = async (id) => {
    try {
      const response = await axios.put(
        `https://poster-adbackend.vercel.app/api/questions/${id}`,
        {
          answer: newAnswer,
        }
      );
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === id
            ? { ...question, answer: response.data.updatedQuestion.answer }
            : question
        )
      );
      setEditingId(null);
      setNewAnswer("");
    } catch (error) {
      console.error("Erro ao atualizar a resposta:", error);
    }
  };

  // Função para ajustar o tamanho do textarea
  const handleTextareaChange = (e) => {
    setNewAnswer(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Função para ativar o modo de edição e ajustar o tamanho do textarea
  const handleEditClick = (id, currentAnswer) => {
    setEditingId(id);
    setNewAnswer(currentAnswer || "");

    // Aguarda o textarea ser renderizado e ajusta sua altura
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reseta o tamanho
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta para o conteúdo
      }
    }, 0);
  };

  return (
    <>
      <div className="background-questions-container">
        <div className="background-questions">
          <img
            src="/background_questions.svg"
            alt="Background"
            className="background-questions-image"
          />
        </div>
      </div>
      <div className="question-home-button-container">
        <button
          className="question-home-button"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          <FontAwesomeIcon className="home-icon" icon={faHouse} size="sm" />
          Voltar
        </button>
      </div>
      <div className="answers-container">
        <h1 className="questions-title">Lista de Perguntas</h1>
        <ul className="questions-list">
          {questions.map((question) => (
            <li key={question._id} className="question-item">
              <div className="question-text">
                <strong>Pergunta:</strong> {question.question} <br />
              </div>
              <div className="answer-text">
                <strong>Resposta:</strong>{" "}
                {editingId === question._id ? (
                  <div className="answer-box">
                    <textarea
                      ref={textareaRef} // Referência para o textarea
                      placeholder="Digite a resposta..."
                      value={newAnswer}
                      onChange={handleTextareaChange}
                      className="answer-textarea"
                    />
                    <div className="button-question-container">
                      <button
                        className="save-button"
                        onClick={() => handleUpdateAnswer(question._id)}
                      >
                        Salvar
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => setEditingId(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="edit-container">
                    {question.answer || "Ainda não respondida"}
                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEditClick(question._id, question.answer)
                      }
                    >
                      <FontAwesomeIcon
                        className="edit-icon"
                        icon={faPencil}
                        size="sm"
                      />
                      Editar
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Answers;
