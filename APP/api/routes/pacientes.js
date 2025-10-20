import express from "express";
import { getPacientes, addPaciente, updatePaciente, deletePaciente } from "../controllers/pacienteController.js";

const router = express.Router();

router.get("/", getPacientes);
router.post("/", addPaciente);
router.put("/:idPaciente", updatePaciente);
router.delete("/:idPaciente", deletePaciente);

export default router;
