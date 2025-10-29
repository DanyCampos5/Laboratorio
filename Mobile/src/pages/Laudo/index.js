import React from "react";

export default function ResultadoLaudo() {

  const paciente = {
    nome: "Pedro Liboni",
    idade: 28,
    sexo: "M",
    prontuario: "123456",
    dataEmissao: "20/06/2024",
  };

  const exames = {
    tipoExame: "TIPAGEM SANGUINEA ABO(RH)",
    materialExame: "SANGUE TOTAL",
    metodoExame: "HEMAGLUTINAÇÃO",
    grupoSanguineo: "B",
    fatorRH: "Positivo",
  };

  const responsavelTecnico = {
    nome: "EDUARDA CAROLINA DO NASCIMENTO",
    crf: "3891"
  };

  return (
    <div className="container">
      <style>{`
        .container {
          font-family: Arial, sans-serif;
          max-width: 700px;
          margin: 20px auto;
          padding: 20px 30px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 50, 100, 0.2);
        }
        .titulo {
          text-align: center;
          color: #0a3d62;
          margin-bottom: 25px;
        }
        h2 {
          color: #1e5f9c;
          border-bottom: 2px solid #cce4f7;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }
        .paciente p {
          margin: 4px 0;
          color: #2c3e50;
        }
        .rodape {
          margin-top: 25px;
          font-size: 12px;
          color: #555;
          text-align: center;
        }
      `}</style>

      <h1 className="titulo">Resultado de Exames</h1>

      <section className="paciente">
        <h2>Paciente</h2>
        <p><b>Nome: </b> {paciente.nome}</p>
        <p><b>Idade: </b> {paciente.idade}</p>
        <p><b>Sexo: </b> {paciente.sexo}</p>
        <p><b>Prontuário: </b> {paciente.prontuario}</p>
        <p><b>Data de Emissão: </b> {paciente.dataEmissao}</p>
      </section>

      <section className="exame">
        <h2>Exames</h2>
            <section className="exame-detalhes">
            <p><b>Exame: </b>{exames.tipoExame} </p>
            <p><b>Material: </b> {paciente.nome}</p>
            <p><b>Método: </b> {paciente.idade}</p>
            <p><b>Grupo Sanguíneo: </b> {paciente.sexo}</p>
            <p><b>Fator RH: </b> {paciente.prontuario}</p>
        </section>
      </section>

      <section className="responsavel">
        <h2>Responsável Técnico</h2>
        <p><b>Nome: </b> {responsavelTecnico.nome}</p>
        <p><b>CRF: </b> {responsavelTecnico.crf}</p>
      </section>

      <p className="rodape">
        Este exemplo não representa o resultado final.
      </p>
    </div>
  );
}
