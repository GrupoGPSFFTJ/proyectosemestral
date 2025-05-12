import { AppDataSource } from "../config/data-source";
import { ProgramaControl } from "../entities/ProgramaControl";
import { FindOneOptions, Repository } from "typeorm";
import { FichaControl } from "../entities/FichaClinica";

// Interface para tipado seguro
interface CreateProgramaData {
    nombre: string;
    descripcion?: string;
    activo: string;
    codigo: string;
}

export class ProgramaControlService {
    private programaRepository: Repository<ProgramaControl>;
    private fichaRepository: Repository<FichaControl>;

    constructor() {
        this.programaRepository = AppDataSource.getRepository(ProgramaControl);
        this.fichaRepository = AppDataSource.getRepository(FichaControl);
    }

    async createPrograma(programaData: CreateProgramaData): Promise<ProgramaControl> {
        // Validar código único
        const existeCodigo = await this.programaRepository.findOneBy({ codigo: programaData.codigo });
        if (existeCodigo) {
            throw new Error("El código del programa ya existe");
        }

        const programa = this.programaRepository.create(programaData);
        return await this.programaRepository.save(programa);
    }

    async getProgramaById(id: number, loadRelations: boolean = false): Promise<ProgramaControl | null> {
        const options: FindOneOptions<ProgramaControl> = {
            where: { id_programa_control: id }
        };

        if (loadRelations) {
            options.relations = ["fichas_control"];
        }

        return await this.programaRepository.findOne(options);
    }

    async getAllProgramas(): Promise<ProgramaControl[]> {
        return await this.programaRepository.find({
            order: { nombre: "ASC" }
        });
    }

    async getActiveProgramas(): Promise<ProgramaControl[]> {
        return await this.programaRepository.find({
            where: { activo: "S" },
            order: { nombre: "ASC" }
        });
    }

    async updatePrograma(id: number, updateData: Partial<ProgramaControl>): Promise<ProgramaControl | null> {
        // Validar si se está actualizando el código
        if (updateData.codigo) {
            const existeCodigo = await this.programaRepository.findOneBy({ codigo: updateData.codigo });
            if (existeCodigo && existeCodigo.id_programa_control !== id) {
                throw new Error("El código del programa ya está en uso");
            }
        }

        await this.programaRepository.update(id, updateData);
        return this.getProgramaById(id);
    }

    async toggleProgramaStatus(id: number): Promise<ProgramaControl | null> {
        const programa = await this.getProgramaById(id);
        if (!programa) return null;

        programa.activo = programa.activo === "S" ? "N" : "S";
        return await this.programaRepository.save(programa);
    }

    async deletePrograma(id: number): Promise<void> {
        // Verificar si tiene fichas asociadas
        const fichasAsociadas = await this.fichaRepository.countBy({ programa_control: { id_programa_control: id } });
        if (fichasAsociadas > 0) {
            throw new Error("No se puede eliminar el programa porque tiene fichas asociadas");
        }

        await this.programaRepository.delete(id);
    }

    async getFichasByPrograma(programaId: number): Promise<FichaControl[]> {
        return await this.fichaRepository.find({
            where: { programa_control: { id_programa_control: programaId } },
            relations: ["paciente", "usuario_responsable"]
        });
    }
}