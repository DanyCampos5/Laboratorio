import express from 'express';
import { 
    getPessoas,
    addPessoa,
    updatePessoa,
    deletePessoa 
    } from '../controllers/pessoa.js';

const router = express.Router();

router.get("/", getPessoas);

router.post("/", addPessoa);

router.put("/:id", updatePessoa);

router.delete("/:idPessoa", deletePessoa);

export default router;