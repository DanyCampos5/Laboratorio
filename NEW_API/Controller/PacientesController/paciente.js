const express = require('express');
const cors = require('cors');
const router = express.Router();
const pool = require('../../db');

const app = express();

app.use(cors());
app.use(express.json());

// ⚠️ SUBSTITUA ESTA FUNÇÃO PELO SEU MIDDLEWARE REAL DE AUTENTICAÇÃO JWT
// Este é apenas um placeholder para mostrar onde aplicar.
const verificarToken = (req, res, next) => { 
    // Lógica para verificar o token JWT aqui
    // Se o token for válido, chame next()
    // Se o token for inválido, retorne res.status(401).json({ error: true, message: "Não autorizado" });
    next(); 
};
// ⚠️ FIM DA SEÇÃO A SER SUBSTITUÍDA

router.get("/", async (req, res) => {
    res.json({ status: "Ok" });
});

// GET todos pacientes - AGORA PROTEGIDA POR TOKEN
router.get("/getpacientes", verificarToken, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM paciente;');
        res.status(200).json(rows);

    } catch (error) {
        console.error("Erro ao realizar consulta: ", error);
        res.status(500).json({ error: true, message: "Erro ao buscar pacientes" });
    }
});

// GET paciente específico - AGORA PROTEGIDA POR TOKEN
router.get("/getpaciente/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.execute(
            'SELECT * FROM paciente WHERE idPaciente = ?',
            [id]
        );

        if (rows.length === 0)
            return res.status(404).json({ error: true, message: "Paciente não encontrado!" });

        res.status(200).json({ error: false, paciente: rows[0] });

    } catch (error) {
        console.error("Erro ao buscar paciente: ", error);
        res.status(500).json({ error: true, message: "Erro ao buscar paciente" });
    }
});

// POST inserir paciente - AGORA PROTEGIDA POR TOKEN
router.post("/insertpaciente", verificarToken, async (req, res) => {
    try {
        const { nome, dataNascimento, telefone, email, sexo, nomeMae, periodo } = req.body;

        if (!nome || !telefone || !email) {
            return res.status(400).json({ error: true, message: "Campos obrigatórios não foram informados" });
        }

        const [result] = await pool.execute(
            `INSERT INTO paciente (nome, dataNascimento, telefone, email, sexo, nomeMae, periodo)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, dataNascimento, telefone, email, sexo, nomeMae, periodo]
        );

        if (result.affectedRows > 0)
            return res.status(201).json({ error: false, message: "Paciente inserido com sucesso" });

        return res.status(400).json({ error: true, message: "Erro ao inserir paciente" });

    } catch (error) {
        console.error("Erro ao inserir paciente: ", error);
        res.status(500).json({ error: true, message: "Erro interno ao inserir paciente" });
    }
});

// PUT atualizar paciente - AGORA PROTEGIDA POR TOKEN
router.put("/updatepaciente/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, dataNascimento, telefone, email, sexo, nomeMae, periodo } = req.body;

        if (!nome || !telefone || !email) {
            return res.status(400).json({ error: true, message: "Campos obrigatórios não foram informados" });
        }

        const [result] = await pool.execute(
            `UPDATE paciente 
             SET nome = ?, dataNascimento = ?, telefone = ?, email = ?, sexo = ?, nomeMae = ?, periodo = ?
             WHERE idPaciente = ?`,
            [nome, dataNascimento, telefone, email, sexo, nomeMae, periodo, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: true, message: "Paciente não encontrado" });

        const [rows] = await pool.execute(
            'SELECT * FROM paciente WHERE idPaciente = ?',
            [id]
        );

        res.status(202).json({ error: false, message: "Paciente atualizado com sucesso", paciente: rows[0] });

    } catch (error) {
        console.error("Erro ao atualizar paciente: ", error);
        res.status(500).json({ error: true, message: "Erro interno ao atualizar paciente" });
    }
});

// DELETE remover paciente - AGORA PROTEGIDA POR TOKEN
router.delete("/deletepaciente/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            'DELETE FROM paciente WHERE idPaciente = ?',
            [id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: true, message: "Paciente não encontrado" });

        res.status(200).json({ error: false, message: "Paciente removido com sucesso" });

    } catch (error) {
        console.error("Erro ao remover paciente: ", error);
        res.status(500).json({ error: true, message: "Erro interno ao remover paciente" });
    }
});

module.exports = router;
