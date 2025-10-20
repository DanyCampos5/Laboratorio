import { db } from '../db.js';

export const getPacientes = async (_, res) => {
  const q = `
    SELECT p.idPaciente, pe.nome, pe.dataNascimento, pe.telefone, pe.email, pe.sexo,
           p.nomeMae, p.periodo, p.dataCadastro
    FROM paciente p
    INNER JOIN pessoa pe ON pe.idPessoa = p.idPessoa
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addPaciente = async (req, res) => {
  const {
    nome,
    dataNascimento,
    telefone,
    email,
    sexo,
    nomeMae,
    periodo
  } = req.body;

  const insertPessoa = `
    INSERT INTO pessoa (nome, dataNascimento, telefone, email, sexo)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(insertPessoa, [nome, dataNascimento, telefone, email, sexo], (err, result) => {
    if (err) return res.status(500).json(err);

    const idPessoa = result.insertId;

    const insertPaciente = `
      INSERT INTO paciente (idPessoa, nomeMae, periodo, dataCadastro)
      VALUES (?, ?, ?, CURDATE())
    `;

    db.query(insertPaciente, [idPessoa, nomeMae, periodo], (err2) => {
      if (err2) return res.status(500).json(err2);
      return res.status(200).json("Paciente adicionado com sucesso.");
    });
  });
};

export const updatePaciente = async (req, res) => {
  const { idPaciente } = req.params;
  const {
    nome,
    dataNascimento,
    telefone,
    email,
    sexo,
    nomeMae,
    periodo
  } = req.body;

  const q1 = `
    UPDATE pessoa
    SET nome = ?, dataNascimento = ?, telefone = ?, email = ?, sexo = ?
    WHERE idPessoa = (SELECT idPessoa FROM paciente WHERE idPaciente = ?)
  `;

  db.query(q1, [nome, dataNascimento, telefone, email, sexo, idPaciente], (err) => {
    if (err) return res.status(500).json(err);

    const q2 = `
      UPDATE paciente
      SET nomeMae = ?, periodo = ?
      WHERE idPaciente = ?
    `;

    db.query(q2, [nomeMae, periodo, idPaciente], (err2) => {
      if (err2) return res.status(500).json(err2);
      return res.status(200).json("Paciente atualizado com sucesso.");
    });
  });
};

export const deletePaciente = async (req, res) => {
  const { idPaciente } = req.params;

  const getPessoa = "SELECT idPessoa FROM paciente WHERE idPaciente = ?";

  db.query(getPessoa, [idPaciente], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Paciente não encontrado.");

    const idPessoa = data[0].idPessoa;

    db.query("DELETE FROM paciente WHERE idPaciente = ?", [idPaciente], (err2) => {
      if (err2) return res.status(500).json(err2);

      db.query("DELETE FROM pessoa WHERE idPessoa = ?", [idPessoa], (err3) => {
        if (err3) return res.status(500).json(err3);
        return res.status(200).json("Paciente deletado com sucesso.");
      });
    });
  });
};
