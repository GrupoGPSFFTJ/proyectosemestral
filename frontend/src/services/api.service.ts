import { Injectable } from '@angular/core';
import { ApiClient } from '../lib/api-client';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private api: ApiClient) { }
    login(data: any): Promise<any> {
        return this.api.post<any>('/core/auth/login', data, false);
    }
    register(data: any): Promise<any> {
        return this.api.post<any>('/core/auth/register', data, false);
    }
    asignarRolUsuario(data: any): Promise<any> {
        return this.api.post<any>('/core/usuario-rol', data, false);
    }
    getUserByUsername(username: string): Promise<any> {
        return this.api.get<any>(`/core/usuarios/user/${username}`);
    }
    getUserByEmail(email: string): Promise<any> {
        return this.api.get<any>(`/core/usuarios/email/${email}`);
    }
    getCentrosSalud(): Promise<any[]> {
        return this.api.get<any[]>('/core/centros-salud/');
    }
    createPaciente(data: any): Promise<any> {
        return this.api.post<any>('/patient/paciente', data);
    }
    getGeneros(): Promise<string[]> {
        return this.api.get<string[]>('/patient/enums/usuario/estados');
    }
    getPacientes(): Promise<any[]> {
        return this.api.get<any[]>('/patient/paciente');
    }
    getPacientesCount() {
        return this.getCount('patient', 'paciente');
    }
    updatePaciente(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/patient/paciente/${id}`, data);
    }
    deletePaciente(id: number): Promise<any> {
        return this.api.delete<any>(`/patient/paciente/${id}`);
    }
    getFamiliasCount() {
        return this.getCount('patient', 'familia');
    }

    getFichasClinicasCount() {
        return this.getCount('patient', 'ficha-control');
    }

    getFichasOdontoCount() {
        return this.getCount('odonto', 'ficha-odontologica');
    }

    getRecetasCount() {
        return this.getCount('pharmacy', 'receta');
    }

    getMedicamentosCount() {
        return this.getCount('pharmacy', 'medicamento');
    }

    getDespachosCount() {
        return this.getCount('pharmacy', 'despacho-medicamento');
    }

    getCitasCount() {
        return this.getCount('clinical', 'cita');
    }

    getVacunasCount() {
        return this.getCount('vaccination', 'vacuna');
    }

    getEstratificacionesCount() {
        return this.getCount('clinical', 'estratificacion-riesgo');
    }

    getFamilias() {
        return this.api.get<any[]>('/patient/familia');
    }

    createFamilia(data: any): Promise<any> {
        return this.api.post<any>('/patient/familia', data);
    }

    updateFamilia(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/patient/familia/${id}`, data);
    }

    deleteFamilia(id: number): Promise<any> {
        return this.api.delete<any>(`/patient/familia/${id}`);
    }

    getFichasControl() {
        return this.api.get<any[]>('/patient/ficha-control');
    }

    createFichaControl(data: any): Promise<any> {
        return this.api.post<any>('/patient/ficha-control', data);
    }

    updateFichaControl(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/patient/ficha-control/${id}`, data);
    }

    deleteFichaControl(id: number): Promise<any> {
        return this.api.delete<any>(`/patient/ficha-control/${id}`);
    }

    getProgramaControl() {
        return this.api.get<any[]>('/patient/programa-control');
    }

    createProgramaControl(data: any): Promise<any> {
        return this.api.post<any>('/patient/programa-control', data);
    }

    updateProgramaControl(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/patient/programa-control/${id}`, data);
    }

    deleteProgramaControl(id: number): Promise<any> {
        return this.api.delete<any>(`/patient/programa-control/${id}`);
    }

    getFichasOdonto() {
        return this.api.get<any[]>('/odonto/ficha-odontologica');
    }

    createFichaOdonto(data: any): Promise<any> {
        return this.api.post<any>('/odonto/ficha-odontologica', data);
    }

    updateFichaOdonto(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/odonto/ficha-odontologica/${id}`, data);
    }

    deleteFichaOdonto(id: number): Promise<any> {
        return this.api.delete<any>(`/odonto/ficha-odontologica/${id}`);
    }

    getProgramasSaludOral() {
        return this.api.get<any[]>('/odonto/programa-salud-oral');
    }

    getUsuarios() {
        return this.api.get<any[]>('/core/usuarios');
    }

    getCitas() {
        return this.api.get<any[]>('/clinical/cita');
    }

    createCita(data: any): Promise<any> {
        return this.api.post<any>('/clinical/cita', data);
    }

    updateCita(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/clinical/cita/${id}`, data);
    }

    deleteCita(id: number): Promise<any> {
        return this.api.delete<any>(`/clinical/cita/${id}`);
    }

    getCitaEstado() {
        return this.api.get<any[]>('/clinical/enums/cita/estados');
    }

    getTipoCita() {
        return this.api.get<any[]>('/clinical/enums/cita/tipos');
    }

    getMedicamentos() {
        return this.api.get<any[]>('/pharmacy/medicamento');
    }

    createMedicamento(data: any): Promise<any> {
        return this.api.post<any>('/pharmacy/medicamento', data);
    }

    updateMedicamento(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/pharmacy/medicamento/${id}`, data);
    }

    deleteMedicamento(id: number): Promise<any> {
        return this.api.delete<any>(`/pharmacy/medicamento/${id}`);
    }

    getRecetas(): Promise<any[]> {
        return this.api.get<any>('/pharmacy/receta');
    }

    createReceta(data: any): Promise<any> {
        return this.api.post<any>('/pharmacy/receta', data);
    }

    updateReceta(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/pharmacy/receta/${id}`, data);
    }

    deleteReceta(id: number): Promise<any> {
        return this.api.delete<any>(`/pharmacy/receta/${id}`);
    }

    getRecetaMedicamentos(): Promise<any[]> {
        return this.api.get<any>('/pharmacy/receta-medicamento');
    }

    createRecetaMedicamento(data: any): Promise<any> {
        return this.api.post<any>('/pharmacy/receta-medicamento', data);
    }

    updateRecetaMedicamento(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/pharmacy/receta-medicamento/${id}`, data);
    }

    deleteRecetaMedicamento(id: number): Promise<any> {
        return this.api.delete<any>(`/pharmacy/receta-medicamento/${id}`);
    }

    getDespachos(): Promise<any[]> {
        return this.api.get<any>('/pharmacy/despacho-medicamento');
    }

    createDespachoMedicamento(data: any): Promise<any> {
        return this.api.post<any>('/pharmacy/despacho-medicamento', data);
    }

    updateDespachoMedicamento(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/pharmacy/despacho-medicamento/${id}`, data);
    }

    deleteDespachoMedicamento(id: number): Promise<any> {
        return this.api.delete<any>(`/pharmacy/despacho-medicamento/${id}`);
    }

    getRecMedByReceta(recetaId: number): Promise<any[]> {
        return this.api.get<any>(`/pharmacy/receta-medicamento/receta/${recetaId}`);
    }

    private getCount(schema: string, table: string): Promise<any[]> {
        return this.api.get<any[]>(`/${schema}/${table}/count`);
    }

    getControlesDesembolso() {
        return this.api.get<any[]>('/nutrition/control-desembolso');
    }

    createControlDesembolso(data: any) {
        return this.api.post<any>('/nutrition/control-desembolso', data);
    }

    updateControlDesembolso(id: number, data: any) {
        return this.api.put<any>(`/nutrition/control-desembolso/${id}`, data);
    }

    deleteControlDesembolso(id: number) {
        return this.api.delete<any>(`/nutrition/control-desembolso/${id}`);
    }

    getInscripcionesPacam() {
        return this.api.get<any[]>('/nutrition/inscripcion-pacam');
    }

    createInscripcionPacam(data: any) {
        return this.api.post<any>('/nutrition/inscripcion-pacam', data);
    }

    updateInscripcionPacam(id: number, data: any) {
        return this.api.put<any>(`/nutrition/inscripcion-pacam/${id}`, data);
    }

    deleteInscripcionPacam(id: number) {
        return this.api.delete<any>(`/nutrition/inscripcion-pacam/${id}`);
    }

    getInformesPacam() {
        return this.api.get<any[]>('/nutrition/informe-pacam');
    }

    createInformePacam(data: any) {
        return this.api.post<any>('/nutrition/informe-pacam', data);
    }

    updateInformePacam(id: number, data: any) {
        return this.api.put<any>(`/nutrition/informe-pacam/${id}`, data);
    }

    deleteInformePacam(id: number) {
        return this.api.delete<any>(`/nutrition/informe-pacam/${id}`);
    }

    getProgramasNutricionales(): any {
        return this.api.get<any[]>('/nutrition/programa-nutricional');
    }

    createProgramaNutricional(data: any): Promise<any> {
        return this.api.post<any>('/nutrition/programa-nutricional', data);
    }
    
    updateProgramaNutricional(id: number, data: any): Promise<any> {
        return this.api.put<any>(`/nutrition/programa-nutricional/${id}`, data);
    }
    
    deleteProgramaNutricional(id: number): Promise<any> {
        return this.api.delete<any>(`/nutrition/programa-nutricional/${id}`);
    }
}
