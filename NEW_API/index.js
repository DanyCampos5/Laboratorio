const express = require('express');
const cors = require('cors');
const examesRoutes = require("./Controller/ExamesController/router");
const usuarioRoutes = require("./Controller/UsuarioController/usuario");

const app = express();

app.use(cors());

app.use(express.json());

app.use('/exames', examesRoutes);
app.use('/usuarios', usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));


