import { Router } from "express";
import {
  getFichasOdontologicas,
  getFichaOdontologicaById,
  createFichaOdontologica,
  updateFichaOdontologica,
  deleteFichaOdontologica,
  getFichasByPaciente,
} from "../controllers/FichaOdontologicaController";

const router = Router();

router.get("/", getFichasOdontologicas);
router.get("/:id", getFichaOdontologicaById);
router.post("/", createFichaOdontologica);
router.put("/:id", updateFichaOdontologica);
router.delete("/:id", deleteFichaOdontologica);
router.get("/paciente/:idPaciente", getFichasByPaciente);

export default router;