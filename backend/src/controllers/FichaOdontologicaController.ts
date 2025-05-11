import { Request, Response } from "express";
import { FichaOdontologicaService } from "../services/FichaOdontologicaService";
import { AppDataSource } from "../config/data-source";
import { FichaOdontologica } from "../entities/FichaOdontologica";

const fichaService = new FichaOdontologicaService();

export const getFichasOdontologicas = async (req: Request, res: Response) => {
    try {
        const fichas = await fichaService.getAllFichas();
        res.json(fichas);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getFichaOdontologicaById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const ficha = await fichaService.getFichaById(id);
        if (ficha) {
            res.json(ficha);
        } else {
            res.status(404).json({ message: "Ficha odontológica no encontrada" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const createFichaOdontologica = async (req: Request, res: Response) => {
    try {
        const ficha = await fichaService.createFicha(req.body);
        res.status(201).json(ficha);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
};

export const updateFichaOdontologica = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const ficha = await fichaService.updateFicha(id, req.body);
        if (ficha) {
            res.json(ficha);
        } else {
            res.status(404).json({ message: "Ficha odontológica no encontrada" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
};

export const deleteFichaOdontologica = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await fichaService.deleteFicha(id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getFichasByPaciente = async (req: Request, res: Response) => {
    try {
        const idPaciente = parseInt(req.params.idPaciente);
        const fichas = await fichaService.getFichasByPaciente(idPaciente);
        res.json(fichas);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};