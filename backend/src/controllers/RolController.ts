import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Rol } from "../entities/Rol";

const rolRepository = AppDataSource.getRepository(Rol);

export const createRol = async (req: Request, res: Response) => {
    try {
        const rol = rolRepository.create(req.body);
        await rolRepository.save(rol);
        res.status(201).json(rol);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await rolRepository.find();
        res.json(roles);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const updateRol = async (req: Request, res: Response) => {
    try {
        await rolRepository.update(req.params.id, req.body);
        const updatedRol = await rolRepository.findOneBy({ id_rol: parseInt(req.params.id) });
        res.json(updatedRol);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const deleteRol = async (req: Request, res: Response) => {
    try {
        await rolRepository.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};