import { Request, Response } from "express";
import { FamiliaService } from "../services/FamiliaService";

export class FamiliaController {
    constructor(private familiaService: FamiliaService) {}

    async createFamilia(req: Request, res: Response) {
        try {
            const familia = await this.familiaService.createFamilia(req.body);
            res.status(201).json(familia);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error desconocido" });
        }
    }

    async getFamiliaById(req: Request, res: Response) {
        try {
            const familia = await this.familiaService.findFamiliaById(parseInt(req.params.id), true);
            familia ? res.json(familia) : res.status(404).json({ message: "Familia no encontrada" });
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error desconocido" });
        }
    }

    async getAllFamilias(req: Request, res: Response) {
        try {
            const familias = await this.familiaService.getAllFamilias();
            res.json(familias);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error desconocido" });
        }
    }

    async updateFamilia(req: Request, res: Response) {
        try {
            const familia = await this.familiaService.updateFamilia(parseInt(req.params.id), req.body);
            res.json(familia);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error desconocido" });
        }
    }

    async deleteFamilia(req: Request, res: Response) {
        try {
            await this.familiaService.deleteFamilia(parseInt(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error desconocido" });
        }
    }

    // Métodos de relaciones
    async addMiembro(req: Request, res: Response) {
        try {
            const miembro = await this.familiaService.addMiembro(parseInt(req.params.id), req.body);
            res.status(201).json(miembro);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error desconocido" });
        }
    }

    async addPlanIntervencion(req: Request, res: Response) {
        try {
            const plan = await this.familiaService.addPlanIntervencion(parseInt(req.params.id), req.body);
            res.status(201).json(plan);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error desconocido" });
        }
    }

    async addFactorRiesgo(req: Request, res: Response) {
        try {
            const factor = await this.familiaService.addFactorRiesgo(parseInt(req.params.id), req.body);
            res.status(201).json(factor);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error desconocido" });
        }
    }

    async addFactorProtector(req: Request, res: Response) {
        try {
            const factor = await this.familiaService.addFactorProtector(parseInt(req.params.id), req.body);
            res.status(201).json(factor);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error desconocido" });
        }
    }
}