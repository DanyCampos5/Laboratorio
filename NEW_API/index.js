const express = require('express');
const cors = require('cors');
const examesRoutes = require("./Controller/ExamesController/exame");
const pacientesRoutes = require("./Controller/PacientesController/paciente");
const pessoasRoutes = require("./Controller/PessoasController/pessoa");
const laudoRoutes = require("./Controller/LaudoController/laudo");

const app = express();

app.use(cors());

app.use(express.json());

app.use('/exames', examesRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/pessoas', pessoasRoutes);
app.use('/laudo', laudoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor ouvindo a porta: ${PORT}`));
