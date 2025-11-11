const express = require('express');
const cors = require('cors');
const router = express.Router();
const app = express();
const pool = require('../../db');


// GET — listar todos os usuários
router.get("/getUsuarios", async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM usuario;");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ error: true, message: "Erro ao listar usuários." });
    }
});

// GET — buscar usuário por ID
router.get("/getUsuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT * FROM usuario WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "Usuário não encontrado." });
        }

        res.status(200).json({ error: false, usuario: rows[0] });
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: true, message: "Erro ao buscar usuário." });
    }
});

// POST — inserir novo usuário
router.post("/insertUsuario", async (req, res) => {
    console.log("Recebido no body:", req.body); //DEBUG
    try {
        const { nome, email, telefone, cpf, registroP, cargoF, senha } = req.body;

        if (!nome || !email || !telefone || !cpf || !registroP || !cargoF || !senha) {
            console.warn("Dados incompletos para inserção de usuário:", req.body); //DEBUG
            return res.status(400).json({
                error: true,
                message: "Todos os campos são obrigatórios!"
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO usuario (nome, email, telefone, cpf, registroP, cargoF, senha)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, email, telefone, cpf, registroP, cargoF, senha]
        );

        console.log("Usuario inserido com sucesso, ID:", result.insertId); //DEBUG

        res.status(201).json({
            error: false,
            message: "Usuário inserido com sucesso!",
            insertId: result.insertId
        });
    } catch (error) {
        //DEBUG detalhado
        console.error("Erro ao inserir usuário:", error);
        console.error("Stack trace:", error.stack);
        console.error("Código do erro MYSQL", error.code);
        console.error("SQL State:", error.sqlState);
        console.error("SQL Message:", error.sqlMessage);

        res.status(500).json({
            error: true,
            message: "Erro ao inserir usuário."
        });
    }
});

// PUT — atualizar usuário existente
router.put("/updateUsuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, cpf, registroP, cargoF, senha } = req.body;

        if (!id || !nome || !email || !telefone || !cpf || !registroP || !cargoF || !senha) {
            return res.status(400).json({
                error: true,
                message: "Informe todos os campos: id, nome, email, telefone, cpf, registroP, cargoF e senha."
            });
        }

        const [result] = await pool.execute(
            `UPDATE usuario 
             SET nome = ?, email = ?, telefone = ?, cpf = ?, registroP = ?, cargoF = ?, senha = ?
             WHERE id = ?`,
            [nome, email, telefone, cpf, registroP, cargoF, senha, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Usuário não encontrado." });
        }

        const [rows] = await pool.execute("SELECT * FROM usuario WHERE id = ?", [id]);
        res.status(200).json({
            error: false,
            message: "Usuário atualizado com sucesso!",
            usuario: rows[0]
        });

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({
            error: true,
            message: "Erro ao atualizar usuário."
        });
    }
});

// DELETE — remover usuário
router.delete("/deleteUsuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.execute("DELETE FROM usuario WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Usuário não encontrado." });
        }

        res.status(200).json({ error: false, message: "Usuário removido com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({
            error: true,
            message: "Erro ao deletar usuário."
        });
    }
});

module.exports = router;


