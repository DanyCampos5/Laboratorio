import express from 'express';
import pessoaRoutes from './routes/pessoas.js';
import pacienteRoutes from "./routes/paciente.js";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", pessoaRoutes);
app.use("/pacientes", pacienteRoutes);

app.listen(8800, () => {
    console.log("Connected to backend!");
});