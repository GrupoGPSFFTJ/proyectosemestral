import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { CentroSalud } from "../entities/CentroSalud";

const centroRepository = AppDataSource.getRepository(CentroSalud);

export const createCentroSalud = async (req: Request, res: Response) => {
    try {
        const centro = centroRepository.create(req.body);
        await centroRepository.save(centro);
        res.status(201).json(centro);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getCentroSaludById = async (req: Request, res: Response) => {
    try {
        const centro = await centroRepository.findOne({
            where: { id_centro_salud: parseInt(req.params.id) },
            relations: ["usuarios", "pacientes", "fichas_control", "fichas_odontologicas", "registros_vacunacion", "inscripciones_pacam"]
        });
        centro ? res.json(centro) : res.status(404).json({ message: "Centro salud not found" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getAllCentrosSalud = async (req: Request, res: Response) => {
    try {
        const centros = await centroRepository.find();
        res.json(centros);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const updateCentroSalud = async (req: Request, res: Response) => {
    try {
        await centroRepository.update(req.params.id, req.body);
        const updatedCentro = await centroRepository.findOneBy({ id_centro_salud: parseInt(req.params.id) });
        res.json(updatedCentro);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const deleteCentroSalud = async (req: Request, res: Response) => {
    try {
        await centroRepository.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};