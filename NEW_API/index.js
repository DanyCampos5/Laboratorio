const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const usuarioRoutes = require("./Controller/UsuarioController/usuario");
const examesRoutes = require("./Controller/ExamesController/exame");
const pacientesRoutes = require("./Controller/PacientesController/paciente");
const laudoRoutes = require("./Controller/LaudoController/laudo");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "ChaveXpto*123@";

function signToken(user){
    const payload = {
        sub: user.id,
        username: user.username
    };
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});
}

const USERS = [
    {id: 1, username: "Alex", password: "123"},
    {id: 2, username: "Dani", password: "321"}    
];

app.get('/', (req, res) => {
  res.send('API está rodando! Use as rotas /login, /usuarios, /exames ou /pacientes');
});

app.post("/login", (req, res) => {
    const {username, password} = req.body || {};
    
    console.log(`Tentativa de login - Usuário: ${username}, Senha: ${password}`);
    
    const user = USERS.find(u => u.username === username && u.password === password);
    
    if(!user) {
        return res.status(403).json({error: "Usuário ou senha incorretos"});
    }
    
    const token = signToken(user);
    console.log(`Login bem-sucedido para o usuário: ${username}. Token gerado.`);
    res.status(200).json({ token });    
});

app.use('/usuarios', usuarioRoutes);
app.use('/exames', examesRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/laudo', laudoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
