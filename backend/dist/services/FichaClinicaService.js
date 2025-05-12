"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FichaClinicaService = void 0;
const data_source_1 = require("../config/data-source");
const FichaClinica_1 = require("../entities/FichaClinica");
const Paciente_1 = require("../entities/Paciente");
const ProgramaControl_1 = require("../entities/ProgramaControl");
const CentroSalud_1 = require("../entities/CentroSalud");
const Usuario_1 = require("../entities/Usuario");
const HistorialResultado_1 = require("../entities/HistorialResultado");
const EstratificacionRiesgo_1 = require("../entities/EstratificacionRiesgo");
class FichaClinicaService {
    constructor() {
        this.fichaRepository = data_source_1.AppDataSource.getRepository(FichaClinica_1.FichaControl);
        this.pacienteRepository = data_source_1.AppDataSource.getRepository(Paciente_1.Paciente);
        this.programaRepository = data_source_1.AppDataSource.getRepository(ProgramaControl_1.ProgramaControl);
        this.centroRepository = data_source_1.AppDataSource.getRepository(CentroSalud_1.CentroSalud);
        this.usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
        this.historialRepository = data_source_1.AppDataSource.getRepository(HistorialResultado_1.HistorialResultado);
        this.estratificacionRepository = data_source_1.AppDataSource.getRepository(EstratificacionRiesgo_1.EstratificacionRiesgo);
    }
    // CRUD Básico
    async createFicha(fichaData) {
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
            await Promise.all(historiales.map(historial => this.addHistorial(savedFicha.id_ficha_control, historial)));
        }
        // Procesar estratificaciones si existen
        if (estratificaciones && estratificaciones.length > 0) {
            await Promise.all(estratificaciones.map(estrData => this.addEstratificacion(savedFicha.id_ficha_control, estrData)));
        }
        // Recargar la ficha con todas las relaciones
        return (await this.getFichaById(savedFicha.id_ficha_control, true));
    }
    async getFichaById(id, loadRelations = true) {
        const options = {
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
    async getAllFichas() {
        return await this.fichaRepository.find({
            relations: ["paciente", "programa_control", "usuario_responsable"]
        });
    }
    async updateFicha(id, updateData) {
        await this.fichaRepository.update(id, updateData);
        return this.getFichaById(id, true);
    }
    async deleteFicha(id) {
        await this.fichaRepository.delete(id);
    }
    // Métodos para Historial de Resultados
    async addHistorial(fichaId, historialData) {
        const ficha = await this.fichaRepository.findOneBy({ id_ficha_control: fichaId });
        if (!ficha)
            throw new Error("Ficha de control no encontrada");
        const historial = this.historialRepository.create({
            ...historialData,
            ficha_control: ficha
        });
        return await this.historialRepository.save(historial);
    }
    async getHistorialesByFicha(fichaId) {
        return await this.historialRepository.find({
            where: { ficha_control: { id_ficha_control: fichaId } }
        });
    }
    // Métodos para Estratificación de Riesgo
    async addEstratificacion(fichaId, estrData) {
        const ficha = await this.fichaRepository.findOneBy({ id_ficha_control: fichaId });
        if (!ficha)
            throw new Error("Ficha de control no encontrada");
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
    async getEstratificacionesByFicha(fichaId) {
        return await this.estratificacionRepository.find({
            where: { ficha_control: { id_ficha_control: fichaId } },
            relations: ["usuario_responsable", "paciente"]
        });
    }
    async updateEstratificacion(id, updateData) {
        await this.estratificacionRepository.update(id, updateData);
        return await this.estratificacionRepository.findOne({
            where: { id_estratificacion_riesgo: id },
            relations: ["usuario_responsable", "paciente", "ficha_control"]
        });
    }
    async deleteEstratificacion(id) {
        await this.estratificacionRepository.delete(id);
    }
}
exports.FichaClinicaService = FichaClinicaService;
