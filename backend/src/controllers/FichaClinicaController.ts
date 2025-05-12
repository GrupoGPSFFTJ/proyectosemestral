import { Request, Response } from "express";
import { FichaClinicaService } from "../services/FichaClinicaService";

export class FichaClinicaController {
    constructor(private fichaService: FichaClinicaService) {}

    async createFicha(req: Request, res: Response) {
        try {
            const ficha = await this.fichaService.createFicha(req.body);
            res.status(201).json(ficha);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getFichaById(req: Request, res: Response) {
        try {
            const ficha = await this.fichaService.getFichaById(parseInt(req.params.id));
            ficha ? res.json(ficha) : res.status(404).json({ message: "Ficha no encontrada" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllFichas(req: Request, res: Response) {
        try {
            const fichas = await this.fichaService.getAllFichas();
            res.json(fichas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateFicha(req: Request, res: Response) {
        try {
            const ficha = await this.fichaService.updateFicha(parseInt(req.params.id), req.body);
            res.json(ficha);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteFicha(req: Request, res: Response) {
        try {
            await this.fichaService.deleteFicha(parseInt(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Métodos para Historial de Resultados
    async addHistorial(req: Request, res: Response) {
        try {
            const historial = await this.fichaService.addHistorial(parseInt(req.params.id), req.body);
            res.status(201).json(historial);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getHistoriales(req: Request, res: Response) {
        try {
            const historiales = await this.fichaService.getHistorialesByFicha(parseInt(req.params.id));
            res.json(historiales);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Métodos para Estratificación de Riesgo
    async addEstratificacion(req: Request, res: Response) {
        try {
            const estratificacion = await this.fichaService.addEstratificacion(parseInt(req.params.id), req.body);
            res.status(201).json(estratificacion);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getEstratificaciones(req: Request, res: Response) {
        try {
            const estratificaciones = await this.fichaService.getEstratificacionesByFicha(parseInt(req.params.id));
            res.json(estratificaciones);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateEstratificacion(req: Request, res: Response) {
        try {
            const estratificacion = await this.fichaService.updateEstratificacion(
                parseInt(req.params.estratificacionId),
                req.body
            );
            res.json(estratificacion);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteEstratificacion(req: Request, res: Response) {
        try {
            await this.fichaService.deleteEstratificacion(parseInt(req.params.estratificacionId));
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}