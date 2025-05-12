"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramaControlController = void 0;
class ProgramaControlController {
    constructor(programaService) {
        this.programaService = programaService;
    }
    async createPrograma(req, res) {
        try {
            const programa = await this.programaService.createPrograma(req.body);
            res.status(201).json(programa);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getProgramaById(req, res) {
        try {
            const programa = await this.programaService.getProgramaById(parseInt(req.params.id), true);
            programa ? res.json(programa) : res.status(404).json({ message: "Programa no encontrado" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllProgramas(req, res) {
        try {
            const programas = await this.programaService.getAllProgramas();
            res.json(programas);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getActiveProgramas(req, res) {
        try {
            const programas = await this.programaService.getActiveProgramas();
            res.json(programas);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updatePrograma(req, res) {
        try {
            const programa = await this.programaService.updatePrograma(parseInt(req.params.id), req.body);
            res.json(programa);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async toggleProgramaStatus(req, res) {
        try {
            const programa = await this.programaService.toggleProgramaStatus(parseInt(req.params.id));
            programa ? res.json(programa) : res.status(404).json({ message: "Programa no encontrado" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deletePrograma(req, res) {
        try {
            await this.programaService.deletePrograma(parseInt(req.params.id));
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getFichasByPrograma(req, res) {
        try {
            const fichas = await this.programaService.getFichasByPrograma(parseInt(req.params.id));
            res.json(fichas);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.ProgramaControlController = ProgramaControlController;
