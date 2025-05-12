import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { UsuarioService } from "../services/UsuarioService";

const router = Router();
const usuarioService = new UsuarioService();
const usuarioController = new UsuarioController(usuarioService);

// Autenticación
router.post("/register", (req, res) => usuarioController.createUsuario(req, res));
router.post("/login", (req, res) => usuarioController.login(req, res));

// Gestión de usuarios
router.get("/:id", (req, res) => usuarioController.getUsuarioById(req, res));
router.post("/:id/roles", (req, res) => usuarioController.assignRoles(req, res));

export default router;