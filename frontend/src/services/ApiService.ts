import { ApiClient } from '@/lib/ApiClient';

const api = new ApiClient();

export class ApiService {
    login(data: any): Promise<any> {
        return api.post<any>('/core/auth/login', data);
    }

    register(data: any): Promise<any> {
        return api.post<any>('/core/auth/register', data);
    }

    asignarRolUsuario(data: any): Promise<any> {
        return api.post<any>('/core/usuario-rol', data);
    }

    getUserByUsername(username: string): Promise<any> {
        return api.get<any>(`/core/usuarios/user/${username}`, true);
    }

    getUserByEmail(email: string): Promise<any> {
        return api.get<any>(`/core/usuarios/email/${email}`, true);
    }

    getCentrosSalud(): Promise<any[]> {
        return api.get<any[]>('/core/centros-salud/');
    }

    createPaciente(data: any): Promise<any> {
        return api.post<any>('/patient/paciente', data);
    }

    getGeneros(): Promise<string[]> {
        return api.get<string[]>('/patient/enums/usuario/estados');
    }

    getPacientes(): Promise<any[]> {
        return api.get<any[]>('/patient/paciente');
    }

    private getCount(schema: string, table: string): Promise<any[]> {
        return api.get<any[]>(`/${schema}/${table}/count`);
    }

    getPacientesCount() {
        return this.getCount('patient', 'paciente');
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
        return api.get<any[]>('/patient/familia');
    }

    createFamilia(data: any): Promise<any> {
        return api.post<any>('/patient/familia', data);
    }

    getFichasControl() {
        return api.get<any[]>('/patient/ficha-control');
    }

    createFichaControl(data: any): Promise<any> {
        return api.post<any>('/patient/ficha-control', data);
    }

    getProgramaControl() {
        return api.get<any[]>('/patient/programa-control');
    }

    createProgramaControl(data: any): Promise<any> {
        return api.post<any>('/patient/programa-control', data);
    }

    getFichasOdonto() {
        return api.get<any[]>('/odonto/ficha-odontologica');
    }

    createFichaOdonto(data: any): Promise<any> {
        return api.post<any>('/odonto/ficha-odontologica', data);
    }

    getProgramasSaludOral() {
        return api.get<any[]>('/odonto/programa-salud-oral');
    }

    getUsuarios() {
        return api.get<any[]>('/core/usuarios');
    }

    getCitass() {
        return api.get<any[]>('/clinical/cita');
    }

    createCita(data: any): Promise<any> {
        return api.post<any>('/clinical/cita', data)
    }

    getCitaEstado() {
        return api.get<any[]>('/clinical/enums/cita/estados');
    }

    getTipoCita() {
        return api.get<any[]>('/clinical/enums/cita/tipos');
    }

    getMedicamentos() {
        return api.get<any[]>('/pharmacy/medicamento');
    }

    createMedicamento(data: any): Promise<any> {
        return api.post<any>('/pharmacy/medicamento', data);
    }

    getRecetas(): Promise<any[]> {
        return api.get<any>('/pharmacy/receta');
    }

    createReceta(data: any): Promise<any> {
        return api.post<any>('/pharmacy/receta', data);
    }

    getRecetaMedicamentos(): Promise<any[]> {
        return api.get<any>('/pharmacy/receta-medicamento');
    }

    createRecetaMedicamento(data: any): Promise<any> {
        return api.post<any>('/pharmacy/receta-medicamento', data);
    }

    getDespachos(): Promise<any[]> {
        return api.get<any>('/pharmacy/despacho-medicamento');
    }

    createDespachoMedicamento(data: any): Promise<any> {
        return api.post<any>('/pharmacy/despacho-medicamento', data);
    }

    getRecMedByReceta(recetaId: number): Promise<any[]> {
        return api.get<any>(`/pharmacy/receta-medicamento/receta/${recetaId}`);
    }
}

export const apiService = new ApiService();