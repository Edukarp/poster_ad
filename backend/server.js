const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/perguntas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, default: null },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

// Rota para salvar a pergunta
app.post("/api/questions", async (req, res) => {
  const { question } = req.body;
  try {
    const newQuestion = new Question({ question });
    await newQuestion.save();
    res.status(201).json({ message: "Pergunta enviada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar a pergunta." });
  }
});

// Rota para listar todas as perguntas
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar as perguntas." });
  }
});

//Rota para responder a pergunta
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.put("/api/questions/:id", async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { answer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Pergunta não encontrada." });
    }

    res
      .status(200)
      .json({ message: "Resposta atualizada com sucesso!", updatedQuestion });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a resposta." });
  }
});
