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

// ROTA: PUT — atualizar tipagem
router.put("/tipagem/:id", async (req, res) => {
    const { id } = req.params;
    const { antigeno, variante, antiA, antiB, antiD, teste } = req.body;

    if (!antigeno || !variante || !antiA || !antiB || !antiD || !teste) {
        return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const sql = `
    UPDATE tipagem 
    SET antigeno = ?, variante = ?, antiA = ?, antiB = ?, antiD = ?, teste = ?
    WHERE id = ?
  `;

    const values = [antigeno, variante, antiA, antiB, antiD, teste, id];

    try {
        await pool.query(sql, values);
        res.json({ message: "Registro atualizado com sucesso!" });
    } catch (err) {
        console.error("Erro no UPDATE:", err);
        res.status(500).json({ error: "Erro ao atualizar dados" });
    }
});

// ROTA: DELETE — excluir tipagem
router.delete("/tipagem/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM tipagem WHERE id = ?", [id]);
        res.json({ message: "Registro excluído com sucesso!" });
    } catch (err) {
        console.error("Erro no DELETE:", err);
        res.status(500).json({ error: "Erro ao excluir dados" });
    }
});

module.exports = router;