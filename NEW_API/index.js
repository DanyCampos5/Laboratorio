const express = require('express');
const cors = require('cors');
const usuarioRoutes = require("./Controller/UsuarioController/usuario");
const examesRoutes = require("./Controller/ExamesController/exame");
const pacientesRoutes = require("./Controller/PacientesController/paciente");
const laudoRoutes = require("./Controller/LaudoController/laudo");

const app = express();

// 🔹 Middlewares globais
app.use(cors());
app.use(express.json());

// 🔹 Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/exames', examesRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/laudo', laudoRoutes);

// 🔹 Rota raiz para teste rápido
app.get('/', (req, res) => {
  res.send('✅ API está rodando! Use /usuarios, /exames ou /pacientes');
});

// 🔹 Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
