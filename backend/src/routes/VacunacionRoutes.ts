import { Router } from "express";
import {
  getRegistrosVacunacion,
  getRegistroVacunacionById,
  createRegistroVacunacion,
  updateRegistroVacunacion,
  deleteRegistroVacunacion,
  getRegistrosByPaciente,
  getVacunas,
  getVacunaById,
  getCalendarioByVacuna,
  createAlertaInasistencia,
  getAlertasByPaciente,
} from "../controllers/VacuacionController";

const router = Router();

// Rutas para registros de vacunación
router.get("/registros", getRegistrosVacunacion);
router.get("/registros/:id", getRegistroVacunacionById);
router.post("/registros", createRegistroVacunacion);
router.put("/registros/:id", updateRegistroVacunacion);
router.delete("/registros/:id", deleteRegistroVacunacion);
router.get("/registros/paciente/:idPaciente", getRegistrosByPaciente);

// Rutas para vacunas
router.get("/vacunas", getVacunas);
router.get("/vacunas/:id", getVacunaById);

// Rutas para calendario de vacunas
router.get("/vacunas/:idVacuna/calendario", getCalendarioByVacuna);

// Rutas para alertas de inasistencia
router.post("/alertas", createAlertaInasistencia);
router.get("/alertas/paciente/:idPaciente", getAlertasByPaciente);

export default router;