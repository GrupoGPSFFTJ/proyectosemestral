import { Request, Response } from "express";
import { NutricionalService } from "../services/NutricionalService";

const nutricionalService = new NutricionalService();

// Programas nutricionales
export const getProgramasNutricionales = async (req: Request, res: Response) => {
    try {
        const programas = await nutricionalService.getAllProgramas();
        res.json(programas);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getProgramaNutricionalById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const programa = await nutricionalService.getProgramaById(id);
        if (programa) {
            res.json(programa);
        } else {
            res.status(404).json({ message: "Programa nutricional no encontrado" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const createProgramaNutricional = async (req: Request, res: Response) => {
    try {
        const programa = await nutricionalService.createPrograma(req.body);
        res.status(201).json(programa);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Inscripciones
export const getInscripcionesPacam = async (req: Request, res: Response) => {
    try {
        const inscripciones = await nutricionalService.getAllInscripciones();
        res.json(inscripciones);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getInscripcionPacamById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const inscripcion = await nutricionalService.getInscripcionById(id);
        if (inscripcion) {
            res.json(inscripcion);
        } else {
            res.status(404).json({ message: "Inscripción no encontrada" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const createInscripcionPacam = async (req: Request, res: Response) => {
    try {
        const inscripcion = await nutricionalService.createInscripcion(req.body);
        res.status(201).json(inscripcion);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
};

export const updateInscripcionPacam = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const inscripcion = await nutricionalService.updateInscripcion(id, req.body);
        if (inscripcion) {
            res.json(inscripcion);
        } else {
            res.status(404).json({ message: "Inscripción no encontrada" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getInscripcionesByPaciente = async (req: Request, res: Response) => {
    try {
        const idPaciente = parseInt(req.params.idPaciente);
        const inscripciones = await nutricionalService.getInscripcionesByPaciente(idPaciente);
        res.json(inscripciones);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getInscripcionesByPrograma = async (req: Request, res: Response) => {
    try {
        const idPrograma = parseInt(req.params.idPrograma);
        const inscripciones = await nutricionalService.getInscripcionesByPrograma(idPrograma);
        res.json(inscripciones);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Controles de desembolso
export const createControlDesembolso = async (req: Request, res: Response) => {
    try {
        const control = await nutricionalService.createControlDesembolso(req.body);
        res.status(201).json(control);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getControlesByInscripcion = async (req: Request, res: Response) => {
    try {
        const idInscripcion = parseInt(req.params.idInscripcion);
        const controles = await nutricionalService.getControlesByInscripcion(idInscripcion);
        res.json(controles);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Informes
export const createInformePacam = async (req: Request, res: Response) => {
    try {
        const informe = await nutricionalService.createInforme(req.body);
        res.status(201).json(informe);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getInformesByPrograma = async (req: Request, res: Response) => {
    try {
        const idPrograma = parseInt(req.params.idPrograma);
        const informes = await nutricionalService.getInformesByPrograma(idPrograma);
        res.json(informes);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};