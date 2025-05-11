import { Router } from "express";
import {
  createCentroSalud,
  getCentroSaludById,
  getAllCentrosSalud,
  updateCentroSalud,
  deleteCentroSalud
} from "../controllers/CentroSaludController";

const router = Router();

router.post("/", createCentroSalud);
router.get("/", getAllCentrosSalud);
router.get("/:id", getCentroSaludById);
router.put("/:id", updateCentroSalud);
router.delete("/:id", deleteCentroSalud);

export default router;