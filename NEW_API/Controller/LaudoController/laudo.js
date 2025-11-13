const express = require('express');
const router = express.Router();
const pool = require('../../db');

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return null;
  try {
    const hoje = new Date();
    const nasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }
    return idade;
  } catch (e) {
    return null;
  }
}

router.get("/getlaudo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: true, message: "O ID do laudo é obrigatório" });
    }

    const query = `
      SELECT 
        -- Paciente (da tabela paciente)
        p.nome AS nomePaciente,
        p.dataNascimento,
        p.sexo AS sexoPaciente,
        
        -- Laudo (da tabela Laudo)
        l.prontuario,
        l.dataHora AS dataEmissao,
        
        -- Responsável (da tabela Usuario)
        u.nome AS nomeResponsavel,
        u.registro AS crfResponsavel,
        
        -- Exame (da tabela ExamesSolicitados)
        es.exame AS tipoExame,
        es.resultado AS resultadoExame,
        es.laboratorio
        
      FROM Laudo l
      
      -- Join para buscar o Responsável
      JOIN Usuario u ON l.idUsuario = u.idUsuario
      
      -- Join para buscar o Exame (usando a correção que sugeri)
      JOIN ExamesSolicitados es ON l.idExameSolicitado = es.idExamesSolicitados
      
      -- Join para buscar o Paciente
      JOIN paciente p ON es.idPaciente = p.idPaciente
      
      WHERE l.idLaudo = ?;
    `;

    const [rows] = await pool.execute(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: true, message: "Laudo não encontrado" });
    }

    const dbData = rows[0];

    let grupoSanguineo = "Não informado";
    let fatorRH = "Não informado";

    if (dbData.resultadoExame) {
        const partes = dbData.resultadoExame.split(' ');
        if (partes.length >= 1) {
            grupoSanguineo = partes[0];
        }
        if (partes.length >= 2) {
            fatorRH = partes[1];
        } else {
            fatorRH = "-"; 
        }
    }

    const laudoFormatado = {
      paciente: {
        nome: dbData.nomePaciente,
        idade: calcularIdade(dbData.dataNascimento),
        sexo: dbData.sexoPaciente,
        prontuario: dbData.prontuario,
        dataEmissao: new Date(dbData.dataEmissao).toLocaleDateString('pt-BR'),
      },
      exames: {
        tipoExame: dbData.tipoExame,
        materialExame: "SANGUE TOTAL",
        metodoExame: "HEMAGLUTINAÇÃO",
        grupoSanguineo: grupoSanguineo,
        fatorRH: fatorRH,
      },
      responsavelTecnico: {
        nome: dbData.nomeResponsavel,
        crf: dbData.crfResponsavel,
      },
    };

    res.status(200).json({ error: false, laudo: laudoFormatado });

  } catch (error) {
    console.error("Erro ao buscar laudo: ", error);
    res.status(500).json({ error: true, message: "Erro interno ao buscar laudo" });
  }
});

module.exports = router;