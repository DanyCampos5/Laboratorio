const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.get("/", async (req, res) => {
    res.status(200).json({ status: "ok", message: "CONEXÃO BOAA" });
})

//rota para exibir todas as pessoas
router.get("/getpessoas", async (req, res) => {
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
        const { dataEntrada, dataExame, resultado, laboratorio, exame, idPaciente, idLabImun } = req.body;

        // Verificar se todos os campos necessários estão presentes
        const camposObrigatorios = ['dataEntrada', 'dataExame', 'resultado', 'laboratorio', 'exame', 'idPaciente'];
        const camposFaltando = camposObrigatorios.find(campo => !req.body[campo]);

        if (camposFaltando) {
            return res.status(400).json({
                error: true,
                message: `O campo ${camposFaltando} é obrigatório`
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
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )`,
            [dataEntrada, dataExame, resultado, laboratorio, exame, idPaciente, idLabImun]
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
        });
    }
})

//rota para mostar pessoa por nome ou cpf
router.get("/getpessoa", async (req, res) => {
    try {
        const { nome } = req.query;
        let query = 'SELECT * FROM pessoa';
        let params = [];

        // Se um nome foi fornecido, adiciona a condição WHERE
        if (nome) {
            query += ' WHERE nome LIKE ?';
            params.push(`%${nome}%`); // usando % para busca parcial do nome
        }

        const [rows] = await pool.execute(query, params);

        if (rows.length === 0) {
            return res.status(404).json({
                error: true,
                message: nome ? `Nenhuma pessoa encontrada com o nome '${nome}'` : "Nenhuma pessoa cadastrada"
            });
        }

        res.status(200).json({
            error: false,
            total: rows.length,
            pessoas: rows
        });
    } catch (error) {
        console.error("Erro na busca:", error);
        res.status(500).json({ error: true, message: "Erro ao buscar pessoas" });
    }
})

// rota para update nos exames
// Rota para buscar exames de um paciente específico
router.get("/getExames/:idPaciente", async (req, res) => {
    try {
        const { idPaciente } = req.params;
        
        const [rows] = await pool.execute(
            `SELECT * FROM ExamesSolicitados 
             WHERE idPaciente = ?
             ORDER BY dataExame DESC`,
            [idPaciente]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: true,
                message: "Nenhum exame encontrado para este paciente"
            });
        }

        res.status(200).json(rows);

    } catch (error) {
        console.error("Erro ao buscar exames:", error);
        res.status(500).json({
            error: true,
            message: "Erro ao buscar exames do paciente"
        });
    }
});

router.put("/editarExame/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { dataExame, resultado } = req.body;

        const [result] = await pool.execute(
            'UPDATE ExamesSolicitados SET dataExame = ?, resultado = ? WHERE idExamesSolicitados = ?',
            [dataExame, resultado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Exame não encontrado" });
        }

        console.log(result);
        res.status(200).json({ error: false, message: "Exame atualizado com sucesso!" });

    } catch (error) {
        console.error("Erro ao remover > ", error);
        res.status(400).json({error: true, message: "Erro ao update"})
    }
})

module.exports = router;