const express = require('express');
const cors = require('cors');
const router = express.Router();
const pool = require('../../db');

const app = express();

app.use(cors());
app.use(express.json());

router.get("/", async (req, res) => {
    res.json({ status: "Ok" });
});

// GET todos pacientes
router.get("/getpacientes", async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM paciente;');
        res.status(200).json(rows);

    } catch (error) {
        console.error("Erro ao realizar consulta: ", error);
        res.status(500).json({ error: true, message: "Erro ao buscar pacientes" });
    }
});

// GET paciente específico
router.get("/getpaciente/:id", async (req, res) => {
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

// POST inserir paciente
router.post("/insertpaciente", async (req, res) => {
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

// PUT atualizar paciente
router.put("/updatepaciente/:id", async (req, res) => {
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

// DELETE remover paciente
router.delete("/deletepaciente/:id", async (req, res) => {
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
