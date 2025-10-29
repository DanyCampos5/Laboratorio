const express = require('express');
const cors = require('cors');
const pool = require('../db/mysqlConnect');

const app = express();

// Middlewares basicos
app.use(cors());
app.use(express.json());

// Função de validação de token
function testaToken(token) {
    return token === "eGv&>V£s}zV_q]#TSx[B520WGP|!~VOpe@~867E";
}


app.get("/", async (req, res) => {
    res.json({ status: "Ok" });
});

// GET en pessoas
app.get("/getpessoas", async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth ? auth.split(" ")[1] : null;

        if (!testaToken(token)) {
            return res.status(403).json({ error: true, message: "Token inválido!" });
        }

        const [rows] = await pool.execute('SELECT * FROM pessoa;');
        res.status(202).json(rows);

    } catch (error) {
        console.error("Erro ao listar pessoas: ", error);
        res.status(500).json({ error: true, message: "Erro interno ao buscar pessoas" });
    }
});

// GET em pessoa específica
app.get("/getpessoa/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.execute(
            'SELECT * FROM pessoa WHERE idPessoa = ?',
            [id]
        );

        if (rows.length === 0)
            return res.status(404).json({ error: true, message: "Pessoa não encontrada!" });

        res.status(200).json({ error: false, pessoa: rows[0] });

    } catch (error) {
        console.error("Erro ao buscar pessoa: ", error);
        res.status(500).json({ error: true, message: "Erro ao buscar pessoa" });
    }
});

// Inseririndo nova pessoa
app.post("/insertpessoa", async (req, res) => {
    try {
        const { nome, dataNascimento, telefone, email, sexo } = req.body;

        if (!nome || !telefone || !email)
            return res.status(400).json({ error: true, message: "Campos obrigatórios não informados!" });

        const [result] = await pool.execute(
            'INSERT INTO pessoa(nome, dataNascimento, telefone, email, sexo) VALUES(?, ?, ?, ?, ?)',
            [nome, dataNascimento, telefone, email, sexo]
        );

        if (result.affectedRows > 0)
            res.status(201).json({ error: false, message: "Pessoa inserida com sucesso!" });
        else
            res.status(400).json({ error: true, message: "Erro ao inserir pessoa!" });

    } catch (error) {
        console.error("Erro ao inserir pessoa: ", error);
        res.status(500).json({ error: true, message: "Erro interno ao inserir pessoa" });
    }
});

// Atualizando pessoa
app.put("/updatepessoa/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, dataNascimento, telefone, email, sexo } = req.body;

        if (!nome || !telefone || !email || !id)
            return res.status(400).json({ error: true, message: "Informe todos os campos obrigatórios!" });

        const [result] = await pool.execute(
            'UPDATE pessoa SET nome = ?, dataNascimento = ?, telefone = ?, email = ?, sexo = ? WHERE idPessoa = ?',
            [nome, dataNascimento, telefone, email, sexo, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: true, message: "Pessoa não encontrada!" });

        const [rows] = await pool.execute(
            'SELECT * FROM pessoa WHERE idPessoa = ?',
            [id]
        );

        res.status(202).json({ error: false, message: "Pessoa atualizada com sucesso!", pessoa: rows[0] });

    } catch (error) {
        console.error("Erro ao atualizar pessoa: ", error);
        res.status(500).json({ error: true, message: "Erro interno ao atualizar pessoa" });
    }
});

// Removendo pessoa (D)
app.delete("/deletepessoa/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            'DELETE FROM pessoa WHERE idPessoa = ?',
            [id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: true, message: "Pessoa não encontrada!" });

        res.status(200).json({ error: false, message: "Pessoa removida com sucesso!" });

    } catch (error) {
        console.error("Erro ao remover pessoa: ", error);
        res.status(500).json({ error: true, message: "Erro interno ao remover pessoa" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
