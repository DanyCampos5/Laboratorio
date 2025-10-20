import {db} from '../db.js';

export const getPessoas = async (_, res) => {
    const p = "SELECT * FROM pessoa";
    
    db.query(p, (err, data) => {
        if (err) return res.json(err);
    
     return res.status(200).json(data);
    });
};

export const addPessoa = async (req, res) => {
    const p = 
    "INSERT INTO pessoa (`nome`, `dataNascimento`, `telefone`, `email`, `sexo`) VALUES (?)";
    
    const values = [
        req.body.nome,
        req.body.dataNascimento,
        req.body.telefone,
        req.body.email,
        req.body.sexo,
    ];

    db.query(p, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Pessoa adicionada com sucesso.");
    });
};

export const updatePessoa = async (req, res) => {
    const p =
    "UPDATE pessoa SET `nome` = ?, `dataNascimento` = ?, `telefone` = ?, `email` = ?, `sexo` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.dataNascimento,
        req.body.telefone,
        req.body.email,
        req.body.sexo,
    ];

    db.query(p, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Pessoa atualizada com sucesso.");
    });
};

export const deletePessoa = async (req, res) => {
    const p = "DELETE FROM pessoa WHERE `idPessoa` = ?";

    db.query(p, [req.params.idPessoa], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Pessoa deletada com sucesso.");
    });
};


