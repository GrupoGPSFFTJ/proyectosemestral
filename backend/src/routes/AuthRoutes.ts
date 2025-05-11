import { Router, Request, Response, RequestHandler } from "express";
import {
  createUsuario,
  loginUsuario,
  getUsuarioById,
  assignRolesToUsuario
} from "../controllers/UsuarioController";

const router = Router();

router.post("/register", createUsuario as RequestHandler);
router.post("/login", loginUsuario as RequestHandler);
router.get("/:id", getUsuarioById as RequestHandler);
router.post("/:id/roles", assignRolesToUsuario as RequestHandler);

export default router;