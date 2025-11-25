const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const usuarioRoutes = require("./Controller/UsuarioController/usuario_corrigido");
const examesRoutes = require("./Controller/ExamesController/exame");
const pacientesRoutes = require("./Controller/PacientesController/paciente");
const laudoRoutes = require("./Controller/LaudoController/laudo");
const loginRoutes = require("./Controller/LoginController/login");

const auth = require("./Controller/auth");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "ChaveXpto*123@";

app.get('/', (req, res) => {
  res.send('API está rodando! Use as rotas /login, /usuarios, /exames ou /pacientes');
});

app.use('/log', loginRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/exames', auth, examesRoutes);
app.use('/pacientes', auth, pacientesRoutes);
app.use('/laudo', laudoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
