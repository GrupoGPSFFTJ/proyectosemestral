import { Request, Response } from "express";
import { VacunacionService } from "../services/VacunacionService";

const vacunacionService = new VacunacionService();

// Registros de vacunación
export const getRegistrosVacunacion = async (req: Request, res: Response) => {
    try {
        const registros = await vacunacionService.getAllRegistros();
        res.json(registros);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getRegistroVacunacionById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const registro = await vacunacionService.getRegistroById(id);
        if (registro) {
            res.json(registro);
        } else {
            res.status(404).json({ message: "Registro de vacunación no encontrado" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const createRegistroVacunacion = async (req: Request, res: Response) => {
    try {
        const registro = await vacunacionService.createRegistro(req.body);
        res.status(201).json(registro);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
};

export const updateRegistroVacunacion = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const registro = await vacunacionService.updateRegistro(id, req.body);
        if (registro) {
            res.json(registro);
        } else {
            res.status(404).json({ message: "Registro de vacunación no encontrado" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
};

export const deleteRegistroVacunacion = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await vacunacionService.deleteRegistro(id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getRegistrosByPaciente = async (req: Request, res: Response) => {
    try {
        const idPaciente = parseInt(req.params.idPaciente);
        const registros = await vacunacionService.getRegistrosByPaciente(idPaciente);
        res.json(registros);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Vacunas
export const getVacunas = async (req: Request, res: Response) => {
    try {
        const vacunas = await vacunacionService.getAllVacunas();
        res.json(vacunas);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getVacunaById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const vacuna = await vacunacionService.getVacunaById(id);
        if (vacuna) {
            res.json(vacuna);
        } else {
            res.status(404).json({ message: "Vacuna no encontrada" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Calendario de vacunas
export const getCalendarioByVacuna = async (req: Request, res: Response) => {
    try {
        const idVacuna = parseInt(req.params.idVacuna);
        const calendario = await vacunacionService.getCalendarioByVacuna(idVacuna);
        res.json(calendario);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Alertas de inasistencia
export const createAlertaInasistencia = async (req: Request, res: Response) => {
    try {
        const alerta = await vacunacionService.createAlertaInasistencia(req.body);
        res.status(201).json(alerta);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getAlertasByPaciente = async (req: Request, res: Response) => {
    try {
        const idPaciente = parseInt(req.params.idPaciente);
        const alertas = await vacunacionService.getAlertasByPaciente(idPaciente);
        res.json(alertas);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};