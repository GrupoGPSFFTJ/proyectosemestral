import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { ProgramaNutricional } from "../entities/ProgramaNutricional";
import { InscripcionPacam } from "../entities/InscripcionPacam";
import { ControlDesembolso } from "../entities/ControlDesembolso";
import { InformePacam } from "../entities/InformePacam";
import { Paciente } from "../entities/Paciente";
import { CentroSalud } from "../entities/CentroSalud";

export class NutricionalService {
  private programaRepository: Repository<ProgramaNutricional>;
  private inscripcionRepository: Repository<InscripcionPacam>;
  private controlRepository: Repository<ControlDesembolso>;
  private informeRepository: Repository<InformePacam>;
  private pacienteRepository: Repository<Paciente>;
  private centroRepository: Repository<CentroSalud>;

  constructor() {
    this.programaRepository = AppDataSource.getRepository(ProgramaNutricional);
    this.inscripcionRepository = AppDataSource.getRepository(InscripcionPacam);
    this.controlRepository = AppDataSource.getRepository(ControlDesembolso);
    this.informeRepository = AppDataSource.getRepository(InformePacam);
    this.pacienteRepository = AppDataSource.getRepository(Paciente);
    this.centroRepository = AppDataSource.getRepository(CentroSalud);
  }

  // Programas nutricionales
  async getAllProgramas(): Promise<ProgramaNutricional[]> {
    return this.programaRepository.find();
  }

  async getProgramaById(id: number): Promise<ProgramaNutricional> {
    const programa = await this.programaRepository.findOne({
      where: { id_programa_nutricional: id },
      relations: ["inscripciones", "informes"],
    });
    if (!programa) throw new Error("Programa nutricional no encontrado");
    return programa;
  }

  async createPrograma(programaData: {
    codigo: string;
    nombre: string;
    descripcion: string;
    activo: string;
  }): Promise<ProgramaNutricional> {
    const programa = this.programaRepository.create(programaData);
    return this.programaRepository.save(programa);
  }

  // Inscripciones
  async getAllInscripciones(): Promise<InscripcionPacam[]> {
    return this.inscripcionRepository.find({
      relations: ["paciente", "programa_nutricional", "centro_salud", "controles_desembolso"],
    });
  }

  async getInscripcionById(id: number): Promise<InscripcionPacam> {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { id_inscripcion_pacam: id },
      relations: ["paciente", "programa_nutricional", "centro_salud", "controles_desembolso"],
    });
    if (!inscripcion) throw new Error("Inscripción no encontrada");
    return inscripcion;
  }

  async createInscripcion(inscripcionData: {
    id_paciente?: number | null;
    id_programa_nutricional: number;
    id_centro_salud: number;
    fecha_inscripcion: Date;
    estado: string;
  }): Promise<InscripcionPacam> {
    const [paciente, programa, centro] = await Promise.all([
      inscripcionData.id_paciente 
        ? this.pacienteRepository.findOneBy({ id_paciente: inscripcionData.id_paciente })
        : Promise.resolve(null),
      this.programaRepository.findOneBy({ id_programa_nutricional: inscripcionData.id_programa_nutricional }),
      this.centroRepository.findOneBy({ id_centro_salud: inscripcionData.id_centro_salud }),
    ]);

    if (!programa || !centro) {
      throw new Error("Programa nutricional o centro de salud no encontrado");
    }

    const inscripcion = this.inscripcionRepository.create({
      fecha_inscripcion: inscripcionData.fecha_inscripcion,
      estado: inscripcionData.estado,
      paciente: paciente || undefined,
      programa_nutricional: programa,
      centro_salud: centro,
    });

    return this.inscripcionRepository.save(inscripcion);
  }

  async updateInscripcion(
    id: number,
    inscripcionData: Partial<InscripcionPacam>
  ): Promise<InscripcionPacam> {
    await this.inscripcionRepository.update(id, inscripcionData);
    const updatedInscripcion = await this.inscripcionRepository.findOneBy({ id_inscripcion_pacam: id });
    if (!updatedInscripcion) throw new Error("Inscripción no encontrada");
    return updatedInscripcion;
  }

  async getInscripcionesByPaciente(idPaciente: number): Promise<InscripcionPacam[]> {
    return this.inscripcionRepository.find({
      where: { paciente: { id_paciente: idPaciente } },
      relations: ["programa_nutricional", "centro_salud"],
    });
  }

  async getInscripcionesByPrograma(idPrograma: number): Promise<InscripcionPacam[]> {
    return this.inscripcionRepository.find({
      where: { programa_nutricional: { id_programa_nutricional: idPrograma } },
      relations: ["paciente", "centro_salud"],
    });
  }

  // Controles de desembolso
  async createControlDesembolso(controlData: {
    id_inscripcion_pacam: number;
    fecha_entrega: Date;
    cantidad_entregada: number;
  }): Promise<ControlDesembolso> {
    const inscripcion = await this.inscripcionRepository.findOneBy({ 
      id_inscripcion_pacam: controlData.id_inscripcion_pacam 
    });

    if (!inscripcion) {
      throw new Error("Inscripción no encontrada");
    }

    const control = this.controlRepository.create({
      fecha_entrega: controlData.fecha_entrega,
      cantidad_entregada: controlData.cantidad_entregada,
      inscripcion_pacam: inscripcion,
    });

    return this.controlRepository.save(control);
  }

  async getControlesByInscripcion(idInscripcion: number): Promise<ControlDesembolso[]> {
    return this.controlRepository.find({
      where: { inscripcion_pacam: { id_inscripcion_pacam: idInscripcion } },
    });
  }

  // Informes
  async createInforme(informeData: {
    id_programa_nutricional: number;
    fecha_informe: Date;
    total_beneficiario: number;
    total_desembolso: number;
  }): Promise<InformePacam> {
    const programa = await this.programaRepository.findOneBy({ 
      id_programa_nutricional: informeData.id_programa_nutricional 
    });

    if (!programa) {
      throw new Error("Programa nutricional no encontrado");
    }

    const informe = this.informeRepository.create({
      fecha_informe: informeData.fecha_informe,
      total_beneficiario: informeData.total_beneficiario,
      total_desembolso: informeData.total_desembolso,
      programa_nutricional: programa,
    });

    return this.informeRepository.save(informe);
  }

  async getInformesByPrograma(idPrograma: number): Promise<InformePacam[]> {
    return this.informeRepository.find({
      where: { programa_nutricional: { id_programa_nutricional: idPrograma } },
    });
  }
}