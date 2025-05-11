import { Router } from "express";
import {
  getProgramasNutricionales,
  getProgramaNutricionalById,
  createProgramaNutricional,
  getInscripcionesPacam,
  getInscripcionPacamById,
  createInscripcionPacam,
  updateInscripcionPacam,
  getInscripcionesByPaciente,
  getInscripcionesByPrograma,
  createControlDesembolso,
  getControlesByInscripcion,
  createInformePacam,
  getInformesByPrograma,
} from "../controllers/NutricionalController";

const router = Router();

// Rutas para programas nutricionales
router.get("/programas", getProgramasNutricionales);
router.get("/programas/:id", getProgramaNutricionalById);
router.post("/programas", createProgramaNutricional);

// Rutas para inscripciones
router.get("/inscripciones", getInscripcionesPacam);
router.get("/inscripciones/:id", getInscripcionPacamById);
router.post("/inscripciones", createInscripcionPacam);
router.put("/inscripciones/:id", updateInscripcionPacam);
router.get("/inscripciones/paciente/:idPaciente", getInscripcionesByPaciente);
router.get("/inscripciones/programa/:idPrograma", getInscripcionesByPrograma);

// Rutas para controles de desembolso
router.post("/controles", createControlDesembolso);
router.get("/inscripciones/:idInscripcion/controles", getControlesByInscripcion);

// Rutas para informes
router.post("/informes", createInformePacam);
router.get("/programas/:idPrograma/informes", getInformesByPrograma);

export default router;