import { Router, Request, Response, RequestHandler } from "express";
import {
  createFamilia,
  getFamiliaById,
  getAllFamilias,
  updateFamilia,
  deleteFamilia,
  addMiembroToFamilia,
  createPlanIntervencion,
  addFactorRiesgo,
  addFactorProtector
} from "../controllers/FamiliaController";

const router = Router();

router.post("/", createFamilia);
router.get("/", getAllFamilias);
router.get("/:id", getFamiliaById);
router.put("/:id", updateFamilia);
router.delete("/:id", deleteFamilia);

// Relaciones
router.post("/:id/miembros", addMiembroToFamilia as RequestHandler);
router.post("/:id/planes-intervencion", createPlanIntervencion as RequestHandler);
router.post("/:id/factores-riesgo", addFactorRiesgo as RequestHandler);
router.post("/:id/factores-protectores", addFactorProtector as RequestHandler);

export default router;