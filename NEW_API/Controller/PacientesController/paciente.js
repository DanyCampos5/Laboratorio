const express = require('express');
const router = express.Router();
const pool = require('../../db'); // arquivo de conexão com o banco

// 🚨 IMPORTANTE: Mude esta chave para a mesma que você usará no seu app.
// Mantenho o que você tinha para compatibilidade, mas JWT é o ideal (como discutido antes).
const CHAVE_SECRETA = 'eGv&>V£s}zV_q]#TSx[B520WGP|!~Y8ex)GTok,~867E'; 

/**
 * Middleware para validar o token de acesso.
 * Este é o mesmo teste de token estático que você usava.
 */
const verificarToken = (req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth ? auth.split(" ")[1] : null;

    if (token === CHAVE_SECRETA) {
        next(); // Token válido, continua para a rota
    } else {
        // Retorna 403 Forbidden se o token for inválido
        return res.status(403).json({ error: true, message: "Token inválido ou ausente." });
    }
};

// --- ROTAS ---

// STATUS da API
router.get("/", async (req, res) => {
    res.json({ status: "API Usuários OK" });
});

// 1. LISTAR TODOS OS USUÁRIOS (READ ALL)
// Endpoint: GET /usuario/getusuarios
router.get("/getusuarios", verificarToken, async (req, res) => {
    try {
        // Não adicionei o setTimeout aqui para não atrasar a API
        const [rows] = await pool.execute('SELECT idUsuario, nome, telefone, email, cpf, registroP, cargoF FROM usuario;');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: true, message: "Erro ao buscar usuários." });
    }
});

// 2. BUSCAR USUÁRIO POR ID (READ ONE)
// Endpoint: GET /usuario/getusuario/:id
router.get("/getusuario/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute(
            'SELECT idUsuario, nome, telefone, email, cpf, registroP, cargoF FROM usuario WHERE idUsuario = ?',
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "Usuário não encontrado." });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        res.status(500).json({ error: true, message: "Erro interno." });
    }
});

// 3. INSERIR NOVO USUÁRIO (CREATE)
// Endpoint: POST /usuario/insertusuario
router.post("/insertusuario", verificarToken, async (req, res) => {
    try {
        const { nome, telefone, email, cpf, registroP, cargoF, senha } = req.body;
        
        // Validação básica de campos
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: true, message: "Nome, Email e Senha são obrigatórios." });
        }
        
        // ⚠️ Nota: Idealmente, a SENHA deveria ser HASHED aqui antes de salvar!
        
        const [result] = await pool.execute(
            `INSERT INTO usuario (nome, telefone, email, cpf, registroP, cargoF, senha)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, telefone, email, cpf, registroP, cargoF, senha]
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

// 4. ATUALIZAR USUÁRIO (UPDATE)
// Endpoint: PUT /usuario/updateusuario/:id
router.put("/updateusuario/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, telefone, email, cpf, registroP, cargoF, senha } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ error: true, message: "Nome e Email são obrigatórios para a atualização." });
        }

        // Se a senha estiver presente, você pode atualizá-la, senão use a senha antiga.
        // ⚠️ Nota: Novamente, a senha nova deve ser HASHED se for alterada!
        
        // Você precisa de uma lógica para atualizar a senha SOMENTE se ela foi enviada.
        // Se a senha for vazia, o frontend não a está enviando ou está enviando vazia.
        let sql = `UPDATE usuario SET nome = ?, telefone = ?, email = ?, cpf = ?, registroP = ?, cargoF = ?`;
        let params = [nome, telefone, email, cpf, registroP, cargoF];

        if (senha) {
            // 🚨 Use HASH aqui se você implementar o bcrypt!
            sql += `, senha = ?`;
            params.push(senha); 
        }

        sql += ` WHERE idUsuario = ?`;
        params.push(id);


        const [result] = await pool.execute(sql, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Usuário não encontrado para atualizar." });
        }

        // 204 No Content é um bom status para UPDATE sem retorno de dados
        res.status(204).end(); 
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ error: true, message: "Erro ao atualizar." });
    }
});

// 5. REMOVER USUÁRIO (DELETE)
// Endpoint: DELETE /usuario/deleteusuario/:id
router.delete("/deleteusuario/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            'DELETE FROM usuario WHERE idUsuario = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Usuário não encontrado para remoção." });
        }

        // 204 No Content é um bom status para DELETE
        res.status(204).end(); 
    } catch (error) {
        console.error("Erro ao remover usuário:", error);
        res.status(500).json({ error: true, message: "Erro ao remover." });
    }
});

module.exports = router;