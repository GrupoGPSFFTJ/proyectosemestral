import { Router } from "express";
import { FichaClinicaController } from "../controllers/FichaClinicaController";
import { FichaClinicaService } from "../services/FichaClinicaService";

const router = Router();
const fichaService = new FichaClinicaService();
const fichaController = new FichaClinicaController(fichaService);

// CRUD básico para Fichas de Control
router.post("/", (req, res) => fichaController.createFicha(req, res));
router.get("/", (req, res) => fichaController.getAllFichas(req, res));
router.get("/:id", (req, res) => fichaController.getFichaById(req, res));
router.put("/:id", (req, res) => fichaController.updateFicha(req, res));
router.delete("/:id", (req, res) => fichaController.deleteFicha(req, res));

// Rutas para Historiales de Resultados
router.post("/:id/historiales", (req, res) => fichaController.addHistorial(req, res));
router.get("/:id/historiales", (req, res) => fichaController.getHistoriales(req, res));

// Rutas para Estratificación de Riesgo
router.post("/:id/estratificaciones", (req, res) => fichaController.addEstratificacion(req, res));
router.get("/:id/estratificaciones", (req, res) => fichaController.getEstratificaciones(req, res));
router.put("/:id/estratificaciones/:estratificacionId", (req, res) => fichaController.updateEstratificacion(req, res));
router.delete("/:id/estratificaciones/:estratificacionId", (req, res) => fichaController.deleteEstratificacion(req, res));

export default router;