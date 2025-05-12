"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProgramaControlController_1 = require("../controllers/ProgramaControlController");
const ProgramaControlService_1 = require("../services/ProgramaControlService");
const router = (0, express_1.Router)();
const programaService = new ProgramaControlService_1.ProgramaControlService();
const programaController = new ProgramaControlController_1.ProgramaControlController(programaService);
// CRUD básico
router.post("/", (req, res) => programaController.createPrograma(req, res));
router.get("/", (req, res) => programaController.getAllProgramas(req, res));
router.get("/activos", (req, res) => programaController.getActiveProgramas(req, res));
router.get("/:id", (req, res) => programaController.getProgramaById(req, res));
router.put("/:id", (req, res) => programaController.updatePrograma(req, res));
router.patch("/:id/toggle-status", (req, res) => programaController.toggleProgramaStatus(req, res));
router.delete("/:id", (req, res) => programaController.deletePrograma(req, res));
// Relaciones
router.get("/:id/fichas", (req, res) => programaController.getFichasByPrograma(req, res));
exports.default = router;
