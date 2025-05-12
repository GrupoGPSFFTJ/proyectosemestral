import { Router } from "express";
import {
  createPaciente,
  getPacienteById,
  getAllPacientes,
  updatePaciente,
  deletePaciente,
  getPacienteFichasControl,
  getPacienteFichasOdontologicas,
  getPacienteRegistrosVacunacion,
  getPacienteInscripcionesPacam,
  getPacienteMiembrosFamiliares
} from "../controllers/PacienteController";

const router = Router();

router.post("/", createPaciente);
router.get("/", getAllPacientes);
router.get("/:id", getPacienteById);
router.put("/:id", updatePaciente);
router.delete("/:id", deletePaciente);

// Relaciones
router.get("/:id/fichas-control", getPacienteFichasControl);
router.get("/:id/fichas-odontologicas", getPacienteFichasOdontologicas);
router.get("/:id/registros-vacunacion", getPacienteRegistrosVacunacion);
router.get("/:id/inscripciones-pacam", getPacienteInscripcionesPacam);
router.get("/:id/miembros-familiares", getPacienteMiembrosFamiliares);

export default router;