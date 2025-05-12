import { Repository } from "typeorm";
import { FichaOdontologica } from "../entities/FichaOdontologica";
import { AppDataSource } from "../config/data-source";
import { Paciente } from "../entities/Paciente";
import { ProgramaSaludOral } from "../entities/ProgramaSaludOral";
import { CentroSalud } from "../entities/CentroSalud";
import { Usuario } from "../entities/Usuario";

export class FichaOdontologicaService {
  private fichaRepository: Repository<FichaOdontologica>;
  private pacienteRepository: Repository<Paciente>;
  private programaRepository: Repository<ProgramaSaludOral>;
  private centroRepository: Repository<CentroSalud>;
  private usuarioRepository: Repository<Usuario>;

  constructor() {
    this.fichaRepository = AppDataSource.getRepository(FichaOdontologica);
    this.pacienteRepository = AppDataSource.getRepository(Paciente);
    this.programaRepository = AppDataSource.getRepository(ProgramaSaludOral);
    this.centroRepository = AppDataSource.getRepository(CentroSalud);
    this.usuarioRepository = AppDataSource.getRepository(Usuario);
  }

  async getAllFichas(): Promise<FichaOdontologica[]> {
    return this.fichaRepository.find({
      relations: [
        "paciente", 
        "programa_salud_oral", 
        "centro_salud", 
        "usuario_responsable"
      ],
    });
  }

  async getFichaById(id: number): Promise<FichaOdontologica | null> {
    return this.fichaRepository.findOne({
      where: { id_ficha_odontologica: id },
      relations: [
        "paciente",
        "programa_salud_oral",
        "centro_salud",
        "usuario_responsable",
        "odontogramas",
        "radiografias"
      ],
    });
  }

  async createFicha(fichaData: {
    id_paciente: number;
    id_programa_salud_oral: number;
    id_centro_salud: number;
    id_usuario_responsable: number;
    fecha_control: Date;
    observacion?: string;
  }): Promise<FichaOdontologica> {
    const [paciente, programa, centro, usuario] = await Promise.all([
      this.pacienteRepository.findOneBy({ id_paciente: fichaData.id_paciente }),
      this.programaRepository.findOneBy({ id_programa_salud_oral: fichaData.id_programa_salud_oral }),
      this.centroRepository.findOneBy({ id_centro_salud: fichaData.id_centro_salud }),
      this.usuarioRepository.findOneBy({ id_usuario: fichaData.id_usuario_responsable }),
    ]);

    if (!paciente || !programa || !centro || !usuario) {
      throw new Error("Datos relacionados no encontrados");
    }

    const ficha = this.fichaRepository.create({
      fecha_control: fichaData.fecha_control,
      observacion: fichaData.observacion,
      paciente,
      programa_salud_oral: programa,
      centro_salud: centro,
      usuario_responsable: usuario,
    });

    return this.fichaRepository.save(ficha);
  }

  async updateFicha(
    id: number,
    fichaData: Partial<FichaOdontologica>
  ): Promise<FichaOdontologica> {
    await this.fichaRepository.update(id, fichaData);
    const updatedFicha = await this.fichaRepository.findOneBy({ id_ficha_odontologica: id });
    if (!updatedFicha) {
      throw new Error("Ficha odontológica no encontrada");
    }
    return updatedFicha;
  }

  async deleteFicha(id: number): Promise<void> {
    const result = await this.fichaRepository.delete(id);
    if (result.affected === 0) {
      throw new Error("Ficha odontológica no encontrada");
    }
  }

  async getFichasByPaciente(idPaciente: number): Promise<FichaOdontologica[]> {
    return this.fichaRepository.find({
      where: { paciente: { id_paciente: idPaciente } },
      relations: ["programa_salud_oral", "usuario_responsable"],
    });
  }
}