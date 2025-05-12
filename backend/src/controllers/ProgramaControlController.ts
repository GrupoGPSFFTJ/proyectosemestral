import { Request, Response } from "express";
import { ProgramaControlService } from "../services/ProgramaControlService";

export class ProgramaControlController {
    constructor(private programaService: ProgramaControlService) {}

    async createPrograma(req: Request, res: Response) {
        try {
            const programa = await this.programaService.createPrograma(req.body);
            res.status(201).json(programa);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProgramaById(req: Request, res: Response) {
        try {
            const programa = await this.programaService.getProgramaById(parseInt(req.params.id), true);
            programa ? res.json(programa) : res.status(404).json({ message: "Programa no encontrado" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllProgramas(req: Request, res: Response) {
        try {
            const programas = await this.programaService.getAllProgramas();
            res.json(programas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getActiveProgramas(req: Request, res: Response) {
        try {
            const programas = await this.programaService.getActiveProgramas();
            res.json(programas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatePrograma(req: Request, res: Response) {
        try {
            const programa = await this.programaService.updatePrograma(parseInt(req.params.id), req.body);
            res.json(programa);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async toggleProgramaStatus(req: Request, res: Response) {
        try {
            const programa = await this.programaService.toggleProgramaStatus(parseInt(req.params.id));
            programa ? res.json(programa) : res.status(404).json({ message: "Programa no encontrado" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletePrograma(req: Request, res: Response) {
        try {
            await this.programaService.deletePrograma(parseInt(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getFichasByPrograma(req: Request, res: Response) {
        try {
            const fichas = await this.programaService.getFichasByPrograma(parseInt(req.params.id));
            res.json(fichas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}