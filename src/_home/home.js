import React, { useState } from 'react';
import './home.css';

const Home = () => {
  const [question, setQuestion] = useState('');

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Sua pergunta foi: ${question}`);
  };

  return (
    <div className="title">
      <h1>Bem-vindo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escreva sua pergunta aqui..."
          value={question}
          onChange={handleInputChange}
          className="question-input"
        />
        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default Home;