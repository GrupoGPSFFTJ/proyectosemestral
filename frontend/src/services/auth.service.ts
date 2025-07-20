import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { environment } from '../environments/environment';

export interface UserInfo {
    id: number;
    username: string;
    nombre: string;
    email: string;
}

export interface RegisterData {
    username: string;
    password: string;
    nombre: string;
    email: string;
    id_centro_salud: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject = new BehaviorSubject<UserInfo | null>(null);
    public user$ = this.userSubject.asObservable();

    constructor(
        private router: Router,
        private apiService: ApiService
    ) {
        this.checkSessionValidity();
        interval(60000).subscribe(() => this.checkSessionValidity());
    }

    private parseSessionDuration(duration: string): number {
        const value = parseInt(duration.slice(0, -1), 10);
        const unit = duration.slice(-1).toLowerCase();

        switch (unit) {
            case 'h':
                return value * 60 * 60 * 1000;
            case 'd':
                return value * 24 * 60 * 60 * 1000;
            case 'm':
                return value * 60 * 1000;
            case 's':
                return value * 1000;
            default:
                return 60 * 60 * 1000;
        }
    }

    private checkSessionValidity(): void {
        const token = localStorage.getItem('token');
        const loginTime = localStorage.getItem('loginTime');
        const userInfoRaw = localStorage.getItem('userInfo');
        const sessionDuration = this.parseSessionDuration(environment.sessionDuration);

        if (token && loginTime && userInfoRaw) {
            const now = Date.now();
            const loginTimeMs = parseInt(loginTime, 10);

            if (now - loginTimeMs > sessionDuration) {
                this.logout();
            } else {
                try {
                    const info: UserInfo = JSON.parse(userInfoRaw);
                    this.userSubject.next(info);
                } catch {
                    this.logout();
                }
            }
        } else {
            this.userSubject.next(null);
        }
    }

    async login(identifier: string, password: string, useEmail: boolean): Promise<void> {
        try {
            const payload: { username?: string; email?: string; password: string } = { password };
            if (useEmail) payload.email = identifier;
            else payload.username = identifier;

            const loginRes = await this.apiService.login(payload);
            localStorage.setItem('token', loginRes.access_token);
            localStorage.setItem('loginTime', Date.now().toString());

            const userInfo: UserInfo = {
                id: loginRes.id_usuario,
                username: loginRes.username,
                nombre: loginRes.nombre,
                email: loginRes.email
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            this.userSubject.next(userInfo);

            setTimeout(() => {
                this.router.navigate(['/dashboard']);
            }, 100);
        } catch (err) {
            if (err instanceof Error) {
                alert('Error al iniciar sesión: ' + err.message);
            } else {
                alert('Error desconocido al iniciar sesión');
            }
            throw err;
        }
    }

    async register(data: RegisterData): Promise<void> {
        try {
            const nuevoUsuario = await this.apiService.register(data);
            const idUsuario = nuevoUsuario.id_usuario;

            const rolRes = await this.apiService.asignarRolUsuario({ id_usuario: idUsuario });

            if (!rolRes) {
                alert('Usuario creado, pero error al asignar rol');
                return;
            }
            alert('Usuario registrado y rol asignado correctamente');
            this.router.navigate(['/']);
        } catch (err: any) {
            alert('Error inesperado al registrar: ' + err.message);
            throw err;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('loginTime');
        this.userSubject.next(null);
        this.router.navigate(['/dashboard']);
    }

    get currentUser(): UserInfo | null {
        return this.userSubject.value;
    }

    get isAuthenticated(): boolean {
        return this.userSubject.value !== null;
    }
}
