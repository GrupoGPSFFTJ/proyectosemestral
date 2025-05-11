import { Router, Request, Response, RequestHandler } from "express";
import {
  createFichaControl,
  getFichaById,
  getAllFichas,
  updateFichaControl,
  deleteFichaControl,
  addHistorialToFicha,
  getHistorialesByFicha,
  addEstratificacionRiesgo,
  getEstratificacionesByFicha,
  updateEstratificacionRiesgo,
  deleteEstratificacionRiesgo
} from "../controllers/FichaClinicaController";

const router = Router();

// CRUD básico para Fichas de Control
router.post("/", createFichaControl as RequestHandler);
router.get("/", getAllFichas);
router.get("/:id", getFichaById as RequestHandler);
router.put("/:id", updateFichaControl);
router.delete("/:id", deleteFichaControl);

// Rutas para Historiales de Resultados
router.post("/:id/historiales", addHistorialToFicha as RequestHandler);
router.get("/:id/historiales", getHistorialesByFicha);

// Rutas para Estratificación de Riesgo
router.post("/:id/estratificaciones", addEstratificacionRiesgo as RequestHandler);
router.get("/:id/estratificaciones", getEstratificacionesByFicha);
router.put("/:id/estratificaciones/:estratificacionId", updateEstratificacionRiesgo);
router.delete("/:id/estratificaciones/:estratificacionId", deleteEstratificacionRiesgo);

export default router;