/* eslint-disable */
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
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Esquema pras perguntas
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

// Esquema para usuários
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

// Rota para registrar um novo usuário
app.post("/api/users", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o email já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email já registrado." });
    }

    // Cria um novo usuário
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar o usuário." });
  }
});

// Rota para listar todos os usuários
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os usuários." });
  }
});

const crypto = require("crypto");

// Rota para login de usuário
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gera um token único usando o módulo crypto
    const token = crypto.randomBytes(32).toString("hex");
    user.token = token;
    await user.save();

    res.status(200).json({ message: "Login bem-sucedido!", user });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

// Middleware para autenticar o token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    // Busca o usuário pelo token no banco de dados
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(403).json({ error: "Token inválido" });
    }

    req.user = user; // Define o usuário no objeto `req`
    next();
  } catch (error) {
    res.status(500).json({ error: "Erro ao validar o token." });
  }
};


// Rota para obter os dados do usuário logado
app.get("/api/users/me", authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o usuário." });
  }
});
