const express = require('express');
const cors = require('cors');
const usuarioRoutes = require("./Controller/UsuarioController/usuario");
const examesRoutes = require("./Controller/ExamesController/exame");
const pacientesRoutes = require("./Controller/PacientesController/paciente");


const app = express();

app.use(cors());

app.use(express.json());

app.use('/exames', examesRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/pacientes', pacientesRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
