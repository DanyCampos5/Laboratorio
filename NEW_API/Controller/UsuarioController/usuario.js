// Controller/UsuarioController/usuario.js

const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Ajuste o caminho conforme necessário
const bcrypt = require('bcrypt'); // 🚨 Não se esqueça de instalar: npm install bcrypt

const saltRounds = 10; // Nível de segurança do hash

// Rotas de Usuário (já protegidas pelo middleware 'auth' no index.js)

// 1. LISTAR TODOS OS USUÁRIOS (READ ALL)
// Rota final será: GET /usuarios/getusuarios
router.get("/getusuarios", async (req, res) => {
    try {
        // Seleciona todos os campos, EXCETO a SENHA (por segurança!)
        const [rows] = await pool.execute('SELECT idUsuario, nome, telefone, email, cpf, registroP, cargoF FROM usuario;');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: true, message: "Erro ao buscar usuários." });
    }
});

// 2. INSERIR NOVO USUÁRIO (CREATE)
// Rota final será: POST /usuarios/insertusuario
router.post("/insertusuario", async (req, res) => {
    try {
        const { nome, telefone, email, cpf, registroP, cargoF, senha } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: true, message: "Nome, Email e Senha são obrigatórios." });
        }
        
        // 🚨 CRUCIAL: Gerar o HASH da senha antes de salvar
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        const [result] = await pool.execute(
            `INSERT INTO usuario (nome, telefone, email, cpf, registroP, cargoF, senha)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, telefone, email, cpf, registroP, cargoF, hashedPassword] // Usa o HASH
        );

        if (result.affectedRows > 0) {
            return res.status(201).json({ error: false, message: "Usuário inserido com sucesso!" });
        }

        res.status(400).json({ error: true, message: "Falha ao inserir usuário." });
    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        res.status(500).json({ error: true, message: "Erro interno ao inserir." });
    }
});

// 3. ATUALIZAR USUÁRIO (UPDATE)
// Rota final será: PUT /usuarios/updateusuario/:id
router.put("/updateusuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, telefone, email, cpf, registroP, cargoF, senha } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ error: true, message: "Nome e Email são obrigatórios para a atualização." });
        }
        
        // Lógica para UPDATE de campos opcionais
        let sql = `UPDATE usuario SET nome = ?, telefone = ?, email = ?, cpf = ?, registroP = ?, cargoF = ?`;
        let params = [nome, telefone, email, cpf, registroP, cargoF];

        if (senha) {
            // Se a senha foi enviada, HASH e atualize-a
            const hashedPassword = await bcrypt.hash(senha, saltRounds);
            sql += `, senha = ?`;
            params.push(hashedPassword);
        }

        sql += ` WHERE idUsuario = ?`;
        params.push(id);


        const [result] = await pool.execute(sql, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Usuário não encontrado para atualizar." });
        }

        res.status(204).end(); // 204 No Content
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ error: true, message: "Erro ao atualizar." });
    }
});

// 4. REMOVER USUÁRIO (DELETE)
// Rota final será: DELETE /usuarios/deleteusuario/:id
router.delete("/deleteusuario/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            'DELETE FROM usuario WHERE idUsuario = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Usuário não encontrado para remoção." });
        }

        res.status(204).end(); // 204 No Content
    } catch (error) {
        console.error("Erro ao remover usuário:", error);
        res.status(500).json({ error: true, message: "Erro ao remover." });
    }
});

module.exports = router;