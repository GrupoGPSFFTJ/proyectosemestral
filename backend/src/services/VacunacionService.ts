import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { RegistroVacunacion } from "../entities/RegistroVacunacion";
import { Paciente } from "../entities/Paciente";
import { Vacuna } from "../entities/Vacuna";
import { CalendarioVacuna } from "../entities/CalendarioVacuna";
import { CentroSalud } from "../entities/CentroSalud";
import { Usuario } from "../entities/Usuario";
import { AlertaInasistencia } from "../entities/AlertaInasistencia";

export class VacunacionService {
  private registroRepository: Repository<RegistroVacunacion>;
  private pacienteRepository: Repository<Paciente>;
  private vacunaRepository: Repository<Vacuna>;
  private calendarioRepository: Repository<CalendarioVacuna>;
  private centroRepository: Repository<CentroSalud>;
  private usuarioRepository: Repository<Usuario>;
  private alertaRepository: Repository<AlertaInasistencia>;

  constructor() {
    this.registroRepository = AppDataSource.getRepository(RegistroVacunacion);
    this.pacienteRepository = AppDataSource.getRepository(Paciente);
    this.vacunaRepository = AppDataSource.getRepository(Vacuna);
    this.calendarioRepository = AppDataSource.getRepository(CalendarioVacuna);
    this.centroRepository = AppDataSource.getRepository(CentroSalud);
    this.usuarioRepository = AppDataSource.getRepository(Usuario);
    this.alertaRepository = AppDataSource.getRepository(AlertaInasistencia);
  }

  // Registros de vacunación
  async getAllRegistros(): Promise<RegistroVacunacion[]> {
    return this.registroRepository.find({
      relations: [
        "paciente", 
        "vacuna", 
        "calendario_vacuna", 
        "centro_salud", 
        "usuario_responsable"
      ],
    });
  }

  async getRegistroById(id: number): Promise<RegistroVacunacion> {
    const registro = await this.registroRepository.findOne({
      where: { id_registro_vacunacion: id },
      relations: [
        "paciente",
        "vacuna",
        "calendario_vacuna",
        "centro_salud",
        "usuario_responsable",
        "alerta_inasistencia"
      ],
    });
    if (!registro) throw new Error("Registro de vacunación no encontrado");
    return registro;
  }

  async createRegistro(registroData: {
    id_paciente: number;
    id_vacuna: number;
    id_calendario_vacuna?: number;
    id_centro_salud: number;
    id_usuario_responsable: number;
    fecha_aplicacion: Date;
    lote?: string;
  }): Promise<RegistroVacunacion> {
    const [paciente, vacuna, calendario, centro, usuario] = await Promise.all([
      this.pacienteRepository.findOneBy({ id_paciente: registroData.id_paciente }),
      this.vacunaRepository.findOneBy({ id_vacuna: registroData.id_vacuna }),
      registroData.id_calendario_vacuna
        ? this.calendarioRepository.findOneBy({ id_calendario_vacuna: registroData.id_calendario_vacuna })
        : Promise.resolve(null),
      this.centroRepository.findOneBy({ id_centro_salud: registroData.id_centro_salud }),
      this.usuarioRepository.findOneBy({ id_usuario: registroData.id_usuario_responsable }),
    ]);

    if (!paciente || !vacuna || !centro || !usuario) {
      throw new Error("Datos relacionados no encontrados");
    }

    const registro = this.registroRepository.create({
      fecha_aplicacion: registroData.fecha_aplicacion,
      lote: registroData.lote,
      paciente,
      vacuna,
      calendario_vacuna: calendario || undefined,
      centro_salud: centro,
      usuario_responsable: usuario,
    });

    return this.registroRepository.save(registro);
  }

  async updateRegistro(
    id: number,
    registroData: Partial<RegistroVacunacion>
  ): Promise<RegistroVacunacion> {
    await this.registroRepository.update(id, registroData);
    const updatedRegistro = await this.registroRepository.findOneBy({ id_registro_vacunacion: id });
    if (!updatedRegistro) throw new Error("Registro de vacunación no encontrado");
    return updatedRegistro;
  }

  async deleteRegistro(id: number): Promise<void> {
    const result = await this.registroRepository.delete(id);
    if (result.affected === 0) {
      throw new Error("Registro de vacunación no encontrado");
    }
  }

  async getRegistrosByPaciente(idPaciente: number): Promise<RegistroVacunacion[]> {
    return this.registroRepository.find({
      where: { paciente: { id_paciente: idPaciente } },
      relations: ["vacuna", "calendario_vacuna", "usuario_responsable"],
    });
  }

  // Vacunas
  async getAllVacunas(): Promise<Vacuna[]> {
    return this.vacunaRepository.find({ relations: ["calendarios"] });
  }

  async getVacunaById(id: number): Promise<Vacuna> {
    const vacuna = await this.vacunaRepository.findOne({
      where: { id_vacuna: id },
      relations: ["calendarios"],
    });
    if (!vacuna) throw new Error("Vacuna no encontrada");
    return vacuna;
  }

  // Calendario de vacunas
  async getCalendarioByVacuna(idVacuna: number): Promise<CalendarioVacuna[]> {
    return this.calendarioRepository.find({
      where: { vacuna: { id_vacuna: idVacuna } },
    });
  }

  // Alertas de inasistencia
  async createAlertaInasistencia(alertaData: {
    id_registro_vacunacion: number;
    fecha_alerta: Date;
    motivo: string;
  }): Promise<AlertaInasistencia> {
    const registro = await this.registroRepository.findOneBy({ 
      id_registro_vacunacion: alertaData.id_registro_vacunacion 
    });
    
    if (!registro) {
      throw new Error("Registro de vacunación no encontrado");
    }

    const alerta = this.alertaRepository.create({
      fecha_alerta: alertaData.fecha_alerta,
      motivo: alertaData.motivo,
      registro_vacunacion: registro,
    });

    return this.alertaRepository.save(alerta);
  }

  async getAlertasByPaciente(idPaciente: number): Promise<AlertaInasistencia[]> {
    return this.alertaRepository.find({
      where: { registro_vacunacion: { paciente: { id_paciente: idPaciente } } },
      relations: ["registro_vacunacion", "registro_vacunacion.vacuna"],
    });
  }
}