const express = require('express');
const cors = require('cors');
const router = express.Router();
const pool = require('../../db');

const app = express();
app.use(cors());
app.use(express.json());

const verificarToken = (req, res, next) => { next(); };

router.get("/", async (req, res) => {
    res.json({ status: "Ok" });
});

router.get("/getpacientes", verificarToken, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM paciente;');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: true });
    }
});

router.get("/getpaciente/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute(
            'SELECT * FROM paciente WHERE idPaciente = ?',
            [id]
        );
        if (rows.length === 0)
            return res.status(404).json({ error: true });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: true });
    }
});

router.post("/", verificarToken, async (req, res) => {
    try {
        const { nome, dataNascimento, telefone, email, sexo, nomeMae, periodo } = req.body;
        if (!nome || !telefone || !email)
            return res.status(400).json({ error: true });

        const [result] = await pool.execute(
            `INSERT INTO paciente (nome, dataNascimento, telefone, email, sexo, nomeMae, periodo)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, dataNascimento, telefone, email, sexo, nomeMae, periodo]
        );

        if (result.affectedRows > 0)
            return res.status(201).json({ error: false });

        res.status(400).json({ error: true });
    } catch (error) {
        res.status(500).json({ error: true });
    }
});

router.put("/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, dataNascimento, telefone, email, sexo, nomeMae, periodo } = req.body;

        if (!nome || !telefone || !email)
            return res.status(400).json({ error: true });

        const [result] = await pool.execute(
            `UPDATE paciente 
             SET nome = ?, dataNascimento = ?, telefone = ?, email = ?, sexo = ?, nomeMae = ?, periodo = ?
             WHERE idPaciente = ?`,
            [nome, dataNascimento, telefone, email, sexo, nomeMae, periodo, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: true });

        res.status(202).json({ error: false });
    } catch (error) {
        res.status(500).json({ error: true });
    }
});

router.delete("/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            'DELETE FROM paciente WHERE idPaciente = ?',
            [id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: true });

        res.status(200).json({ error: false });
    } catch (error) {
        res.status(500).json({ error: true });
    }
});

module.exports = router;
