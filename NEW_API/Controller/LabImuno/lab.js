const express = require("express");
const router = express.Router();
const pool = require("../../db");

// ROTA: GET — listar todas as tipagens
router.get("/tipagem", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM tipagem");
        res.json(rows);
    } catch (err) {
        console.error("Erro no SELECT:", err);
        res.status(500).json({ error: "Erro ao buscar dados" });
    }
});

// ROTA: POST — inserir nova tipagem
router.post("/tipagem", async (req, res) => {
    const { antigeno, variante, antiA, antiB, antiD, teste } = req.body;

    if (!antigeno || !variante || !antiA || !antiB || !antiD || !teste) {
        return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const sql = `
    INSERT INTO tipagem (antigeno, variante, antiA, antiB, antiD, teste, date)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

    const values = [antigeno, variante, antiA, antiB, antiD, teste];

    try {
        await pool.query(sql, values);
        res.json({ message: "Registro salvo com sucesso!" });
    } catch (err) {
        console.error("Erro no INSERT:", err);
        res.status(500).json({ error: "Erro ao inserir dados" });
    }
});

module.exports = router;