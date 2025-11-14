const express = require('express');
const cors = require('cors');
const pool = require('../../db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Função para validar token
function testaToken(token) {
  return token === "eGv&>V£s}zV_q]#TSx[B520WGP|!~Y8ex)GTok,~867E";
}

// Status da API
app.get("/", (req, res) => {
  res.json({ status: "API Pessoas OK" });
});

// Listar todas as pessoas
app.get("/getpessoas", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const token = auth ? auth.split(" ")[1] : null;

    if (!testaToken(token)) return res.status(403).json({ error: true, message: "Token inválido!" });

    const [rows] = await pool.execute("SELECT * FROM pessoa;");
    setTimeout(() => { // Simula delay
      res.status(200).json(rows);
    }, 2000);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro ao buscar pessoas" });
  }
});

// Buscar pessoa por ID
app.get("/getpessoa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute("SELECT * FROM pessoa WHERE idPessoa = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: true, message: "Pessoa não encontrada!" });
    res.status(200).json({ error: false, pessoa: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro interno" });
  }
});

// Inserir nova pessoa
app.post("/insertpessoa", async (req, res) => {
  try {
    const { nome, telefone, email, cpf, registroP, cargoF, senha } = req.body;
    if (!nome || !telefone || !email) return res.status(400).json({ error: true, message: "Campos obrigatórios faltando" });

    const [result] = await pool.execute(
      "INSERT INTO pessoa (nome, telefone, email, cpf, registroP, cargoF, senha) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nome, telefone, email, cpf, registroP, cargoF, senha]
    );

    res.status(201).json({ error: false, message: "Pessoa inserida com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro interno ao inserir" });
  }
});

// Atualizar pessoa
app.put("/updatepessoa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email, cpf, registroP, cargoF, senha } = req.body;

    const [result] = await pool.execute(
      "UPDATE pessoa SET nome=?, telefone=?, email=?, cpf=?, registroP=?, cargoF=?, senha=? WHERE idPessoa=?",
      [nome, telefone, email, cpf, registroP, cargoF, senha, id]
    );

    if (result.affectedRows === 0) return res.status(400).json({ error: true, message: "Pessoa não encontrada" });

    res.status(200).json({ error: false, message: "Pessoa atualizada!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro ao atualizar" });
  }
});

// Remover pessoa
app.delete("/deletepessoa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute("DELETE FROM pessoa WHERE idPessoa = ?", [id]);

    if (result.affectedRows === 0) return res.status(400).json({ error: true, message: "Pessoa não encontrada" });

    res.status(200).json({ error: false, message: "Pessoa removida com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro ao remover" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
