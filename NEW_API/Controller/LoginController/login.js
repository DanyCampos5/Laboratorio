const express = require('express');
const router = express.Router();
const pool = require('../../db');
const jwt = require('jsonwebtoken');

// ⚠️ JWT_SECRET NÃO é lido do processo.env aqui, use o valor fixo.
const JWT_SECRET = 'ChaveXpto*123@'; 

router.post("/login", async (req, res) => {
    const { email, senha } = req.body; 
    
    // Declara 'token' com 'let' para que ele exista no escopo da função, 
    // mas só é atribuído dentro do try.
    let token; 

    // 1. Validação de Campos (OK)
    if (!email || !senha) {
        return res.status(400).json({ 
            error: true, 
            message: "Email e senha são obrigatórios." 
        });
    }

    try {
        // 2. Busca do Usuário no DB
        const [rows] = await pool.execute(
            "SELECT idUsuario, username, password FROM usuario WHERE username = ?",
            [email] 
        );
        
        const user = rows[0];

        // 3. Verifica se o usuário existe (OK)
        if (!user) {
            return res.status(401).json({ error: true, message: "Credenciais inválidas." });
        }

        // 4. COMPARAÇÃO (Correto, mas inseguro)
        const match = senha === user.password; 

        if (!match) {
            return res.status(401).json({ error: true, message: "Credenciais inválidas." });
        }

        // 5. Geração do Token JWT (AGORA DENTRO DO TRY, USANDO O 'let token' ACIMA)
        const payload = {
            id: user.idUsuario, 
            email: user.username 
        };
        
        token = jwt.sign(payload, JWT_SECRET, { // ⬅️ Atribuição
            expiresIn: '1d'
        });

        // 6. Resposta de Sucesso (CORRIGIDA)
        res.status(200).json({ 
            error: false, 
            message: "Login bem-sucedido!", 
            token: token,
            user: { 
                id: user.idUsuario, // Usando a coluna correta
                nome: user.username, // Usando a coluna correta
                email: user.username // Usando a coluna correta
            }
        });

    } catch (error) {
        // Este bloco será executado se houver um erro no DB ou no JWT
        console.error("Erro no processo de login:", error);
        
        // Se o erro foi 'ReferenceError: token is not defined', 
        // a atribuição do 'token' falhou, mas este bloco não precisa dele.
        // Retorna 500 para qualquer erro no servidor (DB, etc.)
        res.status(500).json({ error: true, message: "Erro interno do servidor." });
    }
});

module.exports = router;