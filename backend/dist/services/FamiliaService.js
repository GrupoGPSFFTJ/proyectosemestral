"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamiliaService = void 0;
const data_source_1 = require("../config/data-source");
const Familia_1 = require("../entities/Familia");
const MiembroFamiliar_1 = require("../entities/MiembroFamiliar");
const PlanIntervencion_1 = require("../entities/PlanIntervencion");
const FactorRiesgo_1 = require("../entities/FactorRiesgo");
const FactorProtector_1 = require("../entities/FactorProtector");
class FamiliaService {
    constructor() {
        this.familiaRepository = data_source_1.AppDataSource.getRepository(Familia_1.Familia);
        this.miembroRepository = data_source_1.AppDataSource.getRepository(MiembroFamiliar_1.MiembroFamiliar);
        this.planRepository = data_source_1.AppDataSource.getRepository(PlanIntervencion_1.PlanIntervencion);
        this.factorRiesgoRepository = data_source_1.AppDataSource.getRepository(FactorRiesgo_1.FactorRiesgo);
        this.factorProtectorRepository = data_source_1.AppDataSource.getRepository(FactorProtector_1.FactorProtector);
    }
    // CRUD Básico
    async createFamilia(data) {
        const familia = this.familiaRepository.create(data);
        return await this.familiaRepository.save(familia);
    }
    async findFamiliaById(id, loadRelations = false) {
        const options = {
            where: { id_familia: id }
        };
        if (loadRelations) {
            options.relations = ["miembros", "planes_intervencion", "factores_riesgo", "factores_protectores"];
        }
        return await this.familiaRepository.findOne(options);
    }
    async getAllFamilias() {
        return await this.familiaRepository.find();
    }
    async updateFamilia(id, data) {
        await this.familiaRepository.update(id, data);
        return this.findFamiliaById(id);
    }
    async deleteFamilia(id) {
        await this.familiaRepository.delete(id);
    }
    // Relaciones
    async addMiembro(familiaId, miembroData) {
        const familia = await this.findFamiliaById(familiaId);
        if (!familia)
            throw new Error("Familia no encontrada");
        const miembro = this.miembroRepository.create({
            ...miembroData,
            familia
        });
        return await this.miembroRepository.save(miembro);
    }
    async addPlanIntervencion(familiaId, planData) {
        const familia = await this.findFamiliaById(familiaId);
        if (!familia)
            throw new Error("Familia no encontrada");
        const plan = this.planRepository.create({
            ...planData,
            familia
        });
        return await this.planRepository.save(plan);
    }
    async addFactorRiesgo(familiaId, factorData) {
        const familia = await this.findFamiliaById(familiaId);
        if (!familia)
            throw new Error("Familia no encontrada");
        const factor = this.factorRiesgoRepository.create({
            ...factorData,
            familia
        });
        return await this.factorRiesgoRepository.save(factor);
    }
    async addFactorProtector(familiaId, factorData) {
        const familia = await this.findFamiliaById(familiaId);
        if (!familia)
            throw new Error("Familia no encontrada");
        const factor = this.factorProtectorRepository.create({
            ...factorData,
            familia
        });
        return await this.factorProtectorRepository.save(factor);
    }
}
exports.FamiliaService = FamiliaService;
