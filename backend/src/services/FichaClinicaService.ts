import { AppDataSource } from "../config/data-source";
import { FichaControl } from "../entities/FichaClinica";
import { Paciente } from "../entities/Paciente";
import { ProgramaControl } from "../entities/ProgramaControl";
import { CentroSalud } from "../entities/CentroSalud";
import { Usuario } from "../entities/Usuario";
import { HistorialResultado } from "../entities/HistorialResultado";
import { EstratificacionRiesgo } from "../entities/EstratificacionRiesgo";
import { FindOneOptions, Repository } from "typeorm";

// Interfaces para tipado seguro
interface CreateFichaData {
    id_paciente: number;
    id_programa_control: number;
    id_centro_salud: number;
    id_usuario_responsable: number;
    fecha_control: Date;
    observacion?: string;
    historiales?: Array<Partial<HistorialResultado>>;
    estratificaciones?: Array<{
        id_paciente: number;
        id_usuario_responsable: number;
        nivel_riesgo: string;
        motivo: string;
        fecha_asignacion: Date;
    }>;
}

interface AddEstratificacionData {
    id_paciente: number;
    id_usuario_responsable: number;
    nivel_riesgo: string;
    motivo: string;
    fecha_asignacion: Date;
}

export class FichaClinicaService {
    private fichaRepository: Repository<FichaControl>;
    private pacienteRepository: Repository<Paciente>;
    private programaRepository: Repository<ProgramaControl>;
    private centroRepository: Repository<CentroSalud>;
    private usuarioRepository: Repository<Usuario>;
    private historialRepository: Repository<HistorialResultado>;
    private estratificacionRepository: Repository<EstratificacionRiesgo>;

    constructor() {
        this.fichaRepository = AppDataSource.getRepository(FichaControl);
        this.pacienteRepository = AppDataSource.getRepository(Paciente);
        this.programaRepository = AppDataSource.getRepository(ProgramaControl);
        this.centroRepository = AppDataSource.getRepository(CentroSalud);
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.historialRepository = AppDataSource.getRepository(HistorialResultado);
        this.estratificacionRepository = AppDataSource.getRepository(EstratificacionRiesgo);
    }

    // CRUD Básico
    async createFicha(fichaData: CreateFichaData): Promise<FichaControl> {
        const { id_paciente, id_programa_control, id_centro_salud, id_usuario_responsable, historiales, estratificaciones, ...rest } = fichaData;
        
        // Validar entidades relacionadas
        const [paciente, programa, centro, usuario] = await Promise.all([
            this.pacienteRepository.findOneBy({ id_paciente }),
            this.programaRepository.findOneBy({ id_programa_control }),
            this.centroRepository.findOneBy({ id_centro_salud }),
            this.usuarioRepository.findOneBy({ id_usuario: id_usuario_responsable })
        ]);

        if (!paciente || !programa || !centro || !usuario) {
            throw new Error("Datos relacionados no válidos");
        }

        // Crear la ficha base
        const ficha = this.fichaRepository.create({
            ...rest,
            paciente,
            programa_control: programa,
            centro_salud: centro,
            usuario_responsable: usuario,
            historiales: [],
            estratificaciones_riesgo: []
        });

        const savedFicha = await this.fichaRepository.save(ficha);

        // Procesar historiales si existen
        if (historiales && historiales.length > 0) {
            await Promise.all(
                historiales.map(historial => 
                    this.addHistorial(savedFicha.id_ficha_control, historial)
            ));
        }

        // Procesar estratificaciones si existen
        if (estratificaciones && estratificaciones.length > 0) {
            await Promise.all(
                estratificaciones.map(estrData => 
                    this.addEstratificacion(savedFicha.id_ficha_control, estrData)
            ));
        }

        // Recargar la ficha con todas las relaciones
        return (await this.getFichaById(savedFicha.id_ficha_control, true))!;
    }

    async getFichaById(id: number, loadRelations: boolean = true): Promise<FichaControl | null> {
        const options: FindOneOptions<FichaControl> = { 
            where: { id_ficha_control: id } 
        };
        
        if (loadRelations) {
            options.relations = [
                "paciente",
                "programa_control", 
                "centro_salud",
                "usuario_responsable",
                "historiales",
                "estratificaciones_riesgo",
                "estratificaciones_riesgo.usuario_responsable"
            ];
        }
        
        return await this.fichaRepository.findOne(options);
    }

    async getAllFichas(): Promise<FichaControl[]> {
        return await this.fichaRepository.find({
            relations: ["paciente", "programa_control", "usuario_responsable"]
        });
    }

    async updateFicha(id: number, updateData: Partial<FichaControl>): Promise<FichaControl | null> {
        await this.fichaRepository.update(id, updateData);
        return this.getFichaById(id, true);
    }

    async deleteFicha(id: number): Promise<void> {
        await this.fichaRepository.delete(id);
    }

    // Métodos para Historial de Resultados
    async addHistorial(fichaId: number, historialData: Partial<HistorialResultado>): Promise<HistorialResultado> {
        const ficha = await this.fichaRepository.findOneBy({ id_ficha_control: fichaId });
        if (!ficha) throw new Error("Ficha de control no encontrada");

        const historial = this.historialRepository.create({
            ...historialData,
            ficha_control: ficha
        });

        return await this.historialRepository.save(historial);
    }

    async getHistorialesByFicha(fichaId: number): Promise<HistorialResultado[]> {
        return await this.historialRepository.find({
            where: { ficha_control: { id_ficha_control: fichaId } }
        });
    }

    // Métodos para Estratificación de Riesgo
    async addEstratificacion(fichaId: number, estrData: AddEstratificacionData): Promise<EstratificacionRiesgo> {
        const ficha = await this.fichaRepository.findOneBy({ id_ficha_control: fichaId });
        if (!ficha) throw new Error("Ficha de control no encontrada");

        const [paciente, usuario] = await Promise.all([
            this.pacienteRepository.findOneBy({ id_paciente: estrData.id_paciente }),
            this.usuarioRepository.findOneBy({ id_usuario: estrData.id_usuario_responsable })
        ]);

        if (!paciente || !usuario) {
            throw new Error("Paciente o usuario no encontrado");
        }

        const estratificacion = this.estratificacionRepository.create({
            nivel_riesgo: estrData.nivel_riesgo,
            motivo: estrData.motivo,
            fecha_asignacion: estrData.fecha_asignacion,
            ficha_control: ficha,
            paciente,
            usuario_responsable: usuario
        });

        return await this.estratificacionRepository.save(estratificacion);
    }

    async getEstratificacionesByFicha(fichaId: number): Promise<EstratificacionRiesgo[]> {
        return await this.estratificacionRepository.find({
            where: { ficha_control: { id_ficha_control: fichaId } },
            relations: ["usuario_responsable", "paciente"]
        });
    }

    async updateEstratificacion(id: number, updateData: Partial<EstratificacionRiesgo>): Promise<EstratificacionRiesgo | null> {
        await this.estratificacionRepository.update(id, updateData);
        return await this.estratificacionRepository.findOne({
            where: { id_estratificacion_riesgo: id },
            relations: ["usuario_responsable", "paciente", "ficha_control"]
        });
    }

    async deleteEstratificacion(id: number): Promise<void> {
        await this.estratificacionRepository.delete(id);
    }
}