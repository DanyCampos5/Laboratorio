const express = require('express');
const cors = require('cors');
const pool = require('../db/mysqlConnect');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).json({status: "ok"});
})

//rota para exibir todas as pessoas
app.get

//rota para inserir um exame
app.post

//rota para mostar pessoa por nome ou cpf
app.get

// rota para update nos exames
app.put

// rota para deletar exames
app.delete


const PORT = 3000;
app.listen(PORT, () => console.log("servidor rodando na porta: ", PORT));
