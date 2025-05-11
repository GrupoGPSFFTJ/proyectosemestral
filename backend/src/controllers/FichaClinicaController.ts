import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { FichaControl } from "../entities/FichaControl";
import { HistorialResultado } from "../entities/HistorialResultado";
import { EstratificacionRiesgo } from "../entities/EstratificacionRiesgo";
import { Paciente } from "../entities/Paciente";
import { Usuario } from "../entities/Usuario";
import { ProgramaControl } from "../entities/ProgramaControl";
import { CentroSalud } from "../entities/CentroSalud";

const fichaRepository = AppDataSource.getRepository(FichaControl);
const historialRepository = AppDataSource.getRepository(HistorialResultado);
const estratificacionRepository = AppDataSource.getRepository(EstratificacionRiesgo);

export const createFichaControl = async (req: Request, res: Response) => {
  try {
    const { id_paciente, id_programa_control, id_centro_salud, id_usuario_responsable, ...fichaData } = req.body;
    
    // Validar entidades relacionadas
    const paciente = await AppDataSource.getRepository(Paciente).findOneBy({ id_paciente });
    const programa = await AppDataSource.getRepository(ProgramaControl).findOneBy({ id_programa_control });
    const centro = await AppDataSource.getRepository(CentroSalud).findOneBy({ id_centro_salud });
    const usuario = await AppDataSource.getRepository(Usuario).findOneBy({ id_usuario: id_usuario_responsable });

    if (!paciente || !programa || !centro || !usuario) {
      return res.status(400).json({ 
        message: "Datos relacionados no válidos",
        details: {
          paciente: !!paciente,
          programa: !!programa,
          centro: !!centro,
          usuario: !!usuario
        }
      });
    }

    const ficha = fichaRepository.create({
      ...fichaData,
      paciente,
      programa_control: programa,
      centro_salud: centro,
      usuario_responsable: usuario
    });

    await fichaRepository.save(ficha);
    res.status(201).json(ficha);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const getFichaById = async (req: Request, res: Response) => {
  try {
    const ficha = await fichaRepository.findOne({
      where: { id_ficha_control: parseInt(req.params.id) },
      relations: [
        "paciente",
        "programa_control", 
        "centro_salud",
        "usuario_responsable",
        "historiales",
        "estratificaciones_riesgo",
        "estratificaciones_riesgo.usuario_responsable"
      ]
    });
    
    if (!ficha) {
      return res.status(404).json({ message: "Ficha de control no encontrada" });
    }
    
    res.json(ficha);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const getAllFichas = async (req: Request, res: Response) => {
  try {
    const fichas = await fichaRepository.find({
      relations: ["paciente", "programa_control", "usuario_responsable"]
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

export const updateFichaControl = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await fichaRepository.update(id, req.body);
    const updatedFicha = await fichaRepository.findOne({
      where: { id_ficha_control: id },
      relations: ["paciente", "programa_control", "usuario_responsable"]
    });
    res.json(updatedFicha);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const deleteFichaControl = async (req: Request, res: Response) => {
  try {
    await fichaRepository.delete(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Métodos para Historial de Resultados
export const addHistorialToFicha = async (req: Request, res: Response) => {
  try {
    const ficha = await fichaRepository.findOneBy({ 
      id_ficha_control: parseInt(req.params.id) 
    });
    
    if (!ficha) {
      return res.status(404).json({ message: "Ficha de control no encontrada" });
    }

    const historial = historialRepository.create({
      ...req.body,
      ficha_control: ficha
    });

    await historialRepository.save(historial);
    res.status(201).json(historial);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const getHistorialesByFicha = async (req: Request, res: Response) => {
  try {
    const historiales = await historialRepository.find({
      where: { ficha_control: { id_ficha_control: parseInt(req.params.id) } }
    });
    res.json(historiales);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Métodos para Estratificación de Riesgo
export const addEstratificacionRiesgo = async (req: Request, res: Response) => {
  try {
    const ficha = await fichaRepository.findOneBy({ 
      id_ficha_control: parseInt(req.params.id) 
    });
    
    if (!ficha) {
      return res.status(404).json({ message: "Ficha de control no encontrada" });
    }

    const { id_paciente, id_usuario_responsable, ...estratificacionData } = req.body;
    
    const paciente = await AppDataSource.getRepository(Paciente).findOneBy({ id_paciente });
    const usuario = await AppDataSource.getRepository(Usuario).findOneBy({ id_usuario: id_usuario_responsable });

    if (!paciente || !usuario) {
      return res.status(400).json({ 
        message: "Paciente o usuario no encontrado",
        details: {
          paciente: !!paciente,
          usuario: !!usuario
        }
      });
    }

    const estratificacion = estratificacionRepository.create({
      ...estratificacionData,
      ficha_control: ficha,
      paciente,
      usuario_responsable: usuario
    });

    await estratificacionRepository.save(estratificacion);
    res.status(201).json(estratificacion);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const getEstratificacionesByFicha = async (req: Request, res: Response) => {
  try {
    const estratificaciones = await estratificacionRepository.find({
      where: { ficha_control: { id_ficha_control: parseInt(req.params.id) } },
      relations: ["usuario_responsable", "paciente"]
    });
    res.json(estratificaciones);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const updateEstratificacionRiesgo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.estratificacionId);
    await estratificacionRepository.update(id, req.body);
    const updatedEstratificacion = await estratificacionRepository.findOne({
      where: { id_estratificacion_riesgo: id },
      relations: ["usuario_responsable", "paciente", "ficha_control"]
    });
    res.json(updatedEstratificacion);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const deleteEstratificacionRiesgo = async (req: Request, res: Response) => {
  try {
    await estratificacionRepository.delete(parseInt(req.params.estratificacionId));
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};