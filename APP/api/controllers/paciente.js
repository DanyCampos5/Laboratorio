
    nome,
    dataNascimento,
    telefone,
    email,
    sexo,
    nomeMae,
    periodo
  

  
const express = require('express');
const cors = require('cors');
const pool = require('../db/mysqlConnect');

const app = express();

//Midlewares básicos
app.use(cors());
app.use(express.json()); //Permitir que recebamos JSON nas requisições

app.get("/", async (req, res) => {
    res.json({status: "Ok"});
});

//GET em pessoas (R)
app.get("/getpessoas", async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM pessoa;'
        );

        setTimeout(()=>{
            console.log("Simulando um delay de API");
            res.status(202).json(rows);
        }, 5000);
        
    } catch (error){
        console.error("Erro ao realizar consulta: ", error);
    }
});

//GET em um pessoa especifico (R)
app.get("/getpessoas/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const [rows] = await pool.execute(
            'SELECT * FROM pessoas WHERE id = ?',
            [id]
        );
        console.log("Resultado da Query: ", rows);
        if(rows.length === 0) return res.status(404).json({error: false, message: "Pessoa não encontrado!"});
        res.status(200).json({error: false, car: rows[0]});
    }catch(error){

    }
})

//Inserindo um novo Pessoa (C)
app.post("/insertcar", async (req, res) => {
    try{
        const { pmarca, pmodelo } = req.body;
        
        if(!pmarca || pmodelo == null){
            return res.status(400).json({error: true, message: "Marca ou modelo não foi informado"});
        }

        const [result] = await pool.execute(
            'INSERT INTO pessoa(marca, modelo) VALUES(?, ?)',
            [pmarca, pmodelo]
        );

        console.log(result);

        if(result.affectedRows > 0){
            res.status(201).json({error: false, message: "Pessoa inserido"});
        }else{
            res.status(400).json({error: true, message: "Pessoa não inserido"});
        }
    }catch(error){
        console.error("Erro ao inserir: ", error);
    }
})

//Atualizando um pessoa (U)
app.put("/updatecar/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const {pmarca, pmodelo} = req.body;
    
        if(!pmarca || !pmodelo || !id) return res.status(400).json({error: true, message: "Informe: id, marca e modelo!"});
    
        const [result] = await pool.execute(
            'UPDATE pessoa SET marca = ?, modelo = ? WHERE id = ?',
            [pmarca, pmodelo, id]
        );
    
        console.log(result);
    
        if(result.affectedRows === 0) return res.status(400).json({error: true, message: "Não foi encontrado pessoa com esse ID"});
    
        const [rows] = await pool.execute(
            'SELECT * FROM pessoa WHERE id = ?',
            [id]
        )
    
        res.status(202).json({error: false, message: "Pessoa atualizado com sucesso!", pessoa: rows[0]});
    }catch(error){
        console.error("Erro ao atualizar: ", error);
        res.status(400).json({error: true, message: "Ocorreu um erro ao tentar atualizar o pessoa!"});
    }
})

//Removendo um pessoa (D)
app.delete("/deletecar/:id", async (req, res) => {
    try{
        const {id} = req.params;

        const [result] = await pool.execute(
            'DELETE FROM pessoa WHERE id = ?',
            [id]
        );

        if(result.affectedRows === 0) return res.status(400).json({error: true, message: "Erro ao remover pessoa, pessoa com o ID não encontrado"});
        res.status(200).json({error: false, message: "Pessoa removido com sucesso!"});
    }catch(error){
        console.error("Erro ao remover: ", error);
        res.status(400).json({error: true, message: "Erro ao remover pessoa!"});
    }


})


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));