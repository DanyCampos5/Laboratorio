const express = require('express');
const router = express.Router();
const pool = require('../../db');

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return null;

  // Se for um número inteiro (ex: 6455), assumimos que é o ano ou algo do tipo?
  // O dump mostra '6455', que não parece um ano válido (muito futuro) nem timestamp (muito antigo).
  // Mas se for apenas um ano (ex: 1990), a lógica seria:
  if (Number.isInteger(dataNascimento)) {
    // Se for um ano (ex: 2000)
    if (dataNascimento > 1900 && dataNascimento < 2100) {
      return new Date().getFullYear() - dataNascimento;
    }
    // Se for outro formato desconhecido, retornamos o valor bruto ou null
    return "N/A";
  }

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

    // NOVA CONSULTA: Busca direto em ExamesSolicitados
    const query = `
      SELECT 
        -- Paciente
        p.nome AS nomePaciente,
        p.dataNascimento,
        p.sexo AS sexoPaciente,
        
        -- Exame (ExamesSolicitados)
        es.idExamesSolicitados AS prontuario, -- Usando o ID do exame como prontuário provisório
        es.dataExame AS dataEmissao,
        es.exame AS tipoExame,
        es.resultado AS resultadoExame,
        es.laboratorio
        
      FROM ExamesSolicitados es
      
      -- Join para buscar o Paciente
      JOIN paciente p ON es.idPaciente = p.idPaciente
      
      WHERE es.idExamesSolicitados = ?;
    `;

    const [rows] = await pool.execute(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: true, message: "Exame não encontrado" });
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
        nome: "Não Informado", // Não existe vínculo no banco atual
        crf: "---",
      },
    };

    res.status(200).json({ error: false, laudo: laudoFormatado });

  } catch (error) {
    console.error("Erro ao buscar laudo: ", error);
    res.status(500).json({ error: true, message: "Erro interno ao buscar laudo" });
  }
});

module.exports = router;