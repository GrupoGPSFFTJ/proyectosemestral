import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Familia } from "../entities/Familia";
import { MiembroFamiliar } from "../entities/MiembroFamiliar";
import { PlanIntervencion } from "../entities/PlanIntervencion";
import { FactorRiesgo } from "../entities/FactorRiesgo";
import { FactorProtector } from "../entities/FactorProtector";

const familiaRepository = AppDataSource.getRepository(Familia);

export const createFamilia = async (req: Request, res: Response) => {
    try {
        const familia = familiaRepository.create(req.body);
        await familiaRepository.save(familia);
        res.status(201).json(familia);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getFamiliaById = async (req: Request, res: Response) => {
    try {
        const familia = await familiaRepository.findOne({
            where: { id_familia: parseInt(req.params.id) },
            relations: ["miembros", "planes_intervencion", "factores_riesgo", "factores_protectores"]
        });
        familia ? res.json(familia) : res.status(404).json({ message: "Familia not found" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getAllFamilias = async (req: Request, res: Response) => {
    try {
        const familias = await familiaRepository.find();
        res.json(familias);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const updateFamilia = async (req: Request, res: Response) => {
    try {
        await familiaRepository.update(req.params.id, req.body);
        const updatedFamilia = await familiaRepository.findOneBy({ id_familia: parseInt(req.params.id) });
        res.json(updatedFamilia);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const deleteFamilia = async (req: Request, res: Response) => {
    try {
        await familiaRepository.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Relaciones de familia
export const addMiembroToFamilia = async (req: Request, res: Response) => {
    try {
        const familia = await familiaRepository.findOneBy({ id_familia: parseInt(req.params.id) });
        if (!familia) return res.status(404).json({ message: "Familia not found" });

        const miembro = AppDataSource.getRepository(MiembroFamiliar).create({
            ...req.body,
            familia
        });
        await AppDataSource.getRepository(MiembroFamiliar).save(miembro);
        res.status(201).json(miembro);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const createPlanIntervencion = async (req: Request, res: Response) => {
    try {
        const familia = await familiaRepository.findOneBy({ id_familia: parseInt(req.params.id) });
        if (!familia) return res.status(404).json({ message: "Familia not found" });

        const plan = AppDataSource.getRepository(PlanIntervencion).create({
            ...req.body,
            familia
        });
        await AppDataSource.getRepository(PlanIntervencion).save(plan);
        res.status(201).json(plan);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const addFactorRiesgo = async (req: Request, res: Response) => {
    try {
        const familia = await familiaRepository.findOneBy({ id_familia: parseInt(req.params.id) });
        if (!familia) return res.status(404).json({ message: "Familia not found" });

        const factor = AppDataSource.getRepository(FactorRiesgo).create({
            ...req.body,
            familia
        });
        await AppDataSource.getRepository(FactorRiesgo).save(factor);
        res.status(201).json(factor);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};  

export const addFactorProtector = async (req: Request, res: Response) => {
    try {
        const familia = await familiaRepository.findOneBy({ id_familia: parseInt(req.params.id) });
        if (!familia) return res.status(404).json({ message: "Familia not found" });

        const factor = AppDataSource.getRepository(FactorProtector).create({
            ...req.body,
            familia
        });
        await AppDataSource.getRepository(FactorProtector).save(factor);
        res.status(201).json(factor);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};