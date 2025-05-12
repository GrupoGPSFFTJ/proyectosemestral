"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = require("../controllers/UsuarioController");
const UsuarioService_1 = require("../services/UsuarioService");
const router = (0, express_1.Router)();
const usuarioService = new UsuarioService_1.UsuarioService();
const usuarioController = new UsuarioController_1.UsuarioController(usuarioService);
// Autenticación
router.post("/register", (req, res) => usuarioController.createUsuario(req, res));
router.post("/login", (req, res) => usuarioController.login(req, res));
// Gestión de usuarios
router.post("/:id/roles", (req, res) => usuarioController.assignRoles(req, res));
router.get("/:id", (req, res) => usuarioController.getUsuarioById(req, res));
exports.default = router;
