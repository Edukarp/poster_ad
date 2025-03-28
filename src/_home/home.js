import React, { useState } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [question, setQuestion] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
    event.target.style.height = 'auto'; 
    event.target.style.height = `${event.target.scrollHeight}px`; 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/questions', {
        question,
      });
      setMessage(response.data.message);
      setQuestion(''); 
    } catch (error) {
      setMessage('Erro ao salvar a pergunta.');
    }
  };

  return (
    <div className="title">
      <h1>Bem-vindo</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Escreva sua pergunta aqui..."
          value={question}
          onChange={handleInputChange}
          className="question-textarea"
        />
        <button type="submit" className="submit-button">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Home;