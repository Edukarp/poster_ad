import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./answers.css";

const Answers = () => {
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const textareaRef = useRef(null); //Referência para o textarea

  // Função para buscar todas as perguntas
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions");
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
        `http://localhost:5000/api/questions/${id}`,
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
    <div className="answers-container">
      <h1>Lista de Perguntas</h1>
      <ul>
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
                    className="textarea"
                  />
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
              ) : (
                <>
                  {question.answer || "Ainda não respondida"}
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(question._id, question.answer)}
                  >
                    Editar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Answers;