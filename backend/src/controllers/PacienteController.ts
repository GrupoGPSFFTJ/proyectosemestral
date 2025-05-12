import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Paciente } from "../entities/Paciente";
import { FichaControl } from "../entities/FichaClinica";
import { FichaOdontologica } from "../entities/FichaOdontologica";
import { RegistroVacunacion } from "../entities/RegistroVacunacion";
import { InscripcionPacam } from "../entities/InscripcionPacam";
import { MiembroFamiliar } from "../entities/MiembroFamiliar";

const pacienteRepository = AppDataSource.getRepository(Paciente);

export const createPaciente = async (req: Request, res: Response) => {
    try {
        const pacienteData = req.body;
        const paciente = pacienteRepository.create(pacienteData);
        await pacienteRepository.save(paciente);
        res.status(201).json(paciente);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getPacienteById = async (req: Request, res: Response) => {
    try {
        const paciente = await pacienteRepository.findOne({
            where: { id_paciente: parseInt(req.params.id) },
            relations: [
                "centro_salud",
                "fichas_control",
                "miembros_familiares",
                "fichas_odontologicas",
                "registros_vacunacion",
                "inscripciones_pacam"
            ]
        });
        paciente ? res.json(paciente) : res.status(404).json({ message: "Paciente not found" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getAllPacientes = async (req: Request, res: Response) => {
    try {
        const pacientes = await pacienteRepository.find({ relations: ["centro_salud"] });
        res.json(pacientes);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const updatePaciente = async (req: Request, res: Response) => {
    try {
        await pacienteRepository.update(req.params.id, req.body);
        const updatedPaciente = await pacienteRepository.findOneBy({ id_paciente: parseInt(req.params.id) });
        res.json(updatedPaciente);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const deletePaciente = async (req: Request, res: Response) => {
    try {
        await pacienteRepository.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Relaciones del paciente
export const getPacienteFichasControl = async (req: Request, res: Response) => {
    try {
        const fichas = await AppDataSource.getRepository(FichaControl).find({
            where: { paciente: { id_paciente: parseInt(req.params.id) } },
            relations: ["programa_control", "usuario_responsable"]
        });
        res.json(fichas);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getPacienteFichasOdontologicas = async (req: Request, res: Response) => {
    try {
        const fichas = await AppDataSource.getRepository(FichaOdontologica).find({
            where: { paciente: { id_paciente: parseInt(req.params.id) } },
            relations: ["programa_salud_oral", "usuario_responsable"]
        });
        res.json(fichas);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getPacienteRegistrosVacunacion = async (req: Request, res: Response) => {
    try {
        const registros = await AppDataSource.getRepository(RegistroVacunacion).find({
            where: { paciente: { id_paciente: parseInt(req.params.id) } },
            relations: ["vacuna", "calendario_vacuna", "usuario_responsable"]
        });
        res.json(registros);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getPacienteInscripcionesPacam = async (req: Request, res: Response) => {
    try {
        const inscripciones = await AppDataSource.getRepository(InscripcionPacam).find({
            where: { paciente: { id_paciente: parseInt(req.params.id) } },
            relations: ["programa_nutricional", "centro_salud"]
        });
        res.json(inscripciones);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getPacienteMiembrosFamiliares = async (req: Request, res: Response) => {
    try {
        const miembros = await AppDataSource.getRepository(MiembroFamiliar).find({
            where: { paciente: { id_paciente: parseInt(req.params.id) } },
            relations: ["familia", "tipo_relacion"]
        });
        res.json(miembros);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};