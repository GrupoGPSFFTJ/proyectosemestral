"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramaControlService = void 0;
const data_source_1 = require("../config/data-source");
const ProgramaControl_1 = require("../entities/ProgramaControl");
const FichaClinica_1 = require("../entities/FichaClinica");
class ProgramaControlService {
    constructor() {
        this.programaRepository = data_source_1.AppDataSource.getRepository(ProgramaControl_1.ProgramaControl);
        this.fichaRepository = data_source_1.AppDataSource.getRepository(FichaClinica_1.FichaControl);
    }
    async createPrograma(programaData) {
        // Validar código único
        const existeCodigo = await this.programaRepository.findOneBy({ codigo: programaData.codigo });
        if (existeCodigo) {
            throw new Error("El código del programa ya existe");
        }
        const programa = this.programaRepository.create(programaData);
        return await this.programaRepository.save(programa);
    }
    async getProgramaById(id, loadRelations = false) {
        const options = {
            where: { id_programa_control: id }
        };
        if (loadRelations) {
            options.relations = ["fichas_control"];
        }
        return await this.programaRepository.findOne(options);
    }
    async getAllProgramas() {
        return await this.programaRepository.find({
            order: { nombre: "ASC" }
        });
    }
    async getActiveProgramas() {
        return await this.programaRepository.find({
            where: { activo: "S" },
            order: { nombre: "ASC" }
        });
    }
    async updatePrograma(id, updateData) {
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
    async toggleProgramaStatus(id) {
        const programa = await this.getProgramaById(id);
        if (!programa)
            return null;
        programa.activo = programa.activo === "S" ? "N" : "S";
        return await this.programaRepository.save(programa);
    }
    async deletePrograma(id) {
        // Verificar si tiene fichas asociadas
        const fichasAsociadas = await this.fichaRepository.countBy({ programa_control: { id_programa_control: id } });
        if (fichasAsociadas > 0) {
            throw new Error("No se puede eliminar el programa porque tiene fichas asociadas");
        }
        await this.programaRepository.delete(id);
    }
    async getFichasByPrograma(programaId) {
        return await this.fichaRepository.find({
            where: { programa_control: { id_programa_control: programaId } },
            relations: ["paciente", "usuario_responsable"]
        });
    }
}
exports.ProgramaControlService = ProgramaControlService;
