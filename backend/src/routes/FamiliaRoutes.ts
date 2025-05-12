import { Router } from "express";
import { FamiliaController } from "../controllers/FamiliaController";
import { FamiliaService } from "../services/FamiliaService";

const router = Router();
const familiaService = new FamiliaService();
const familiaController = new FamiliaController(familiaService);

// CRUD Básico
router.post("/", (req, res) => familiaController.createFamilia(req, res));
router.get("/", (req, res) => familiaController.getAllFamilias(req, res));
router.get("/:id", (req, res) => familiaController.getFamiliaById(req, res));
router.put("/:id", (req, res) => familiaController.updateFamilia(req, res));
router.delete("/:id", (req, res) => familiaController.deleteFamilia(req, res));

// Relaciones
router.post("/:id/miembros", (req, res) => familiaController.addMiembro(req, res));
router.post("/:id/planes-intervencion", (req, res) => familiaController.addPlanIntervencion(req, res));
router.post("/:id/factores-riesgo", (req, res) => familiaController.addFactorRiesgo(req, res));
router.post("/:id/factores-protectores", (req, res) => familiaController.addFactorProtector(req, res));

export default router;