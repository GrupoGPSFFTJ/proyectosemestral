import { AppDataSource } from "../config/data-source";
import { Familia } from "../entities/Familia";
import { MiembroFamiliar } from "../entities/MiembroFamiliar";
import { PlanIntervencion } from "../entities/PlanIntervencion";
import { FactorRiesgo } from "../entities/FactorRiesgo";
import { FactorProtector } from "../entities/FactorProtector";
import { FindOneOptions } from "typeorm";

export class FamiliaService {
    private familiaRepository = AppDataSource.getRepository(Familia);
    private miembroRepository = AppDataSource.getRepository(MiembroFamiliar);
    private planRepository = AppDataSource.getRepository(PlanIntervencion);
    private factorRiesgoRepository = AppDataSource.getRepository(FactorRiesgo);
    private factorProtectorRepository = AppDataSource.getRepository(FactorProtector);

    // CRUD Básico
    async createFamilia(data: Partial<Familia>): Promise<Familia> {
        const familia = this.familiaRepository.create(data);
        return await this.familiaRepository.save(familia);
    }

    async findFamiliaById(id: number, loadRelations: boolean = false): Promise<Familia | null> {
        const options: FindOneOptions<Familia> = { 
            where: { id_familia: id } 
        };
        if (loadRelations) {
            options.relations = ["miembros", "planes_intervencion", "factores_riesgo", "factores_protectores"];
        }
        return await this.familiaRepository.findOne(options);
    }

    async getAllFamilias(): Promise<Familia[]> {
        return await this.familiaRepository.find();
    }

    async updateFamilia(id: number, data: Partial<Familia>): Promise<Familia | null> {
        await this.familiaRepository.update(id, data);
        return this.findFamiliaById(id);
    }

    async deleteFamilia(id: number): Promise<void> {
        await this.familiaRepository.delete(id);
    }

    // Relaciones
    async addMiembro(familiaId: number, miembroData: Partial<MiembroFamiliar>): Promise<MiembroFamiliar> {
        const familia = await this.findFamiliaById(familiaId);
        if (!familia) throw new Error("Familia no encontrada");

        const miembro = this.miembroRepository.create({
            ...miembroData,
            familia
        });
        return await this.miembroRepository.save(miembro);
    }

    async addPlanIntervencion(familiaId: number, planData: Partial<PlanIntervencion>): Promise<PlanIntervencion> {
        const familia = await this.findFamiliaById(familiaId);
        if (!familia) throw new Error("Familia no encontrada");

        const plan = this.planRepository.create({
            ...planData,
            familia
        });
        return await this.planRepository.save(plan);
    }

    async addFactorRiesgo(familiaId: number, factorData: Partial<FactorRiesgo>): Promise<FactorRiesgo> {
        const familia = await this.findFamiliaById(familiaId);
        if (!familia) throw new Error("Familia no encontrada");

        const factor = this.factorRiesgoRepository.create({
            ...factorData,
            familia
        });
        return await this.factorRiesgoRepository.save(factor);
    }

    async addFactorProtector(familiaId: number, factorData: Partial<FactorProtector>): Promise<FactorProtector> {
        const familia = await this.findFamiliaById(familiaId);
        if (!familia) throw new Error("Familia no encontrada");

        const factor = this.factorProtectorRepository.create({
            ...factorData,
            familia
        });
        return await this.factorProtectorRepository.save(factor);
    }
}