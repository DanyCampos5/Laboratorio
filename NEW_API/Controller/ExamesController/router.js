const express = require('express');
const cors = require('cors');
const router = express.Router();
const app = express();
const pool = require('../../db');

app.use(cors());
app.use(express.json());

router.get("/", async (req, res) => {
    res.status(200).json({status: "ok", message: "CONEXÃO BOAA"});
})

//rota para exibir todas as pessoas
router.get("/getPessoas", async (req, res) => {
    try {
        const [rows] = await pool.execute( 
            'SELECT * FROM pessoa' 
        )
        res.status(200).json(rows);
    } catch (error) {
        console.error("DEU ERRO: ", error);
        res.status(400).json({ error: true, message: "erro ao exibir pessoas" });
    }
})

//rota para inserir um exame
router.post

//rota para mostar pessoa por nome ou cpf
router.get

// rota para update nos exames
router.put

// rota para deletar exames
router.delete



module.exports = router;