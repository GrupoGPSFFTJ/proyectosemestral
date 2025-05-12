import { Repository } from "typeorm";
import { Paciente } from "../entities/Paciente";

export class PacienteService {
  constructor(private pacienteRepository: Repository<Paciente>) {}

  async getAllPacientes(): Promise<Paciente[]> {
    return await this.pacienteRepository.find();
  }

  async getPacienteById(id: number): Promise<Paciente | null> {
    return await this.pacienteRepository.findOneBy({ id_paciente: id });
  }

  async createPaciente(pacienteData: Partial<Paciente>): Promise<Paciente> {
    const paciente = this.pacienteRepository.create(pacienteData);
    return await this.pacienteRepository.save(paciente);
  }

  async updatePaciente(id: number, pacienteData: Partial<Paciente>): Promise<Paciente | null> {
    await this.pacienteRepository.update(id, pacienteData);
    return await this.pacienteRepository.findOneBy({ id_paciente: id });
  }

  async deletePaciente(id: number): Promise<void> {
    await this.pacienteRepository.delete(id);
  }
}