import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './answers.css';

const Answers = () => {
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');

  // Função para buscar todas as perguntas
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Erro ao buscar as perguntas:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Função para atualizar a resposta
  const handleUpdateAnswer = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/questions/${id}`, {
        answer: newAnswer,
      });
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === id ? { ...question, answer: response.data.updatedQuestion.answer } : question
        )
      );
      setEditingId(null);
      setNewAnswer(''); 
    } catch (error) {
      console.error('Erro ao atualizar a resposta:', error);
    }
  };

  return (
    <div className="answers-container">
      <h1>Lista de Perguntas</h1>
      <ul>
        {questions.map((question) => (
          <li key={question._id} className="question-item">
            <strong>Pergunta:</strong> {question.question} <br />
            <strong>Resposta:</strong>{' '}
            {editingId === question._id ? (
              <div className="answer-box">
                <input
                  type="text"
                  placeholder="Digite a resposta..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
                <button class="save-button" onClick={() => handleUpdateAnswer(question._id)}>Salvar</button>
                <button class="cancel-button" onClick={() => setEditingId(null)}>Cancelar</button>
              </div>
            ) : (
              <>
                {question.answer || 'Ainda não respondida'}
                <button class="edit-button" onClick={() => {
                  setEditingId(question._id);
                  setNewAnswer(question.answer || '');
                }}>
                  Editar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Answers;