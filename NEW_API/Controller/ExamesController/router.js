const express = require('express');
const cors = require('cors');
const router = express.Router();
const app = express();
const pool = require('../../db');

app.use(cors());
app.use(express.json());

router.get("/", async (req, res) => {
    res.status(200).json({ status: "ok", message: "CONEXÃO BOAA" });
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
router.post("/insertexame", async (req, res) => {
    try {
        const { dataExame, laboratorio, tipoExame, idPaciente } = req.body;

        // Verificar se todos os campos necessários estão presentes
        if (!dataExame) {
            return res.status(400).json({
                error: true,
                message: "O campo dataExame é obrigatório"
            });
        }
        if (!laboratorio) {
            return res.status(400).json({
                error: true,
                message: "O campo laboratorio é obrigatório"
            });
        }
        if (!tipoExame) {
            return res.status(400).json({
                error: true,
                message: "O campo tipoExame é obrigatório"
            });
        }
        if (!idPaciente) {
            return res.status(400).json({
                error: true,
                message: "O campo idPaciente é obrigatório"
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO ExamesSolicitados (
                dataEntrada,
                dataExame,
                resultado,
                laboratorio,
                exame,
                idPaciente,
                idLabImun
            )
            VALUES (
                CURRENT_DATE(),
                ?,
                'Aguardando',
                ?,
                ?,
                ?,
                NULL
            )`,
            [dataExame, laboratorio, tipoExame, idPaciente]
        );

        res.status(201).json({
            error: false,
            message: "Exame inserido com sucesso",
            insertId: result.insertId
        });
            
    } catch (error) {
        console.error("Erro ao inserir exame:", error);
        res.status(500).json({
            error: true,
            message: "Erro ao inserir exame",
            details: error.message
        });
    }
})

//rota para mostar pessoa por nome ou cpf
router.get

// rota para update nos exames
router.put

// rota para deletar exames
router.delete



module.exports = router;