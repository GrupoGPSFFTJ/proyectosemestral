'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from "@/services/ApiService";

interface AuthContextType {
    user: UserInfo | null | undefined;
    login: (identifier: string, password: string, useEmail: boolean) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

interface RegisterData {
    username: string;
    password: string;
    nombre: string;
    email: string;
    id_centro_salud: number;
}

interface UserInfo {
    id: number;
    username: string;
    nombre: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const parseSessionDuration = (duration: string): number => {
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
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
    const router = useRouter();

    const checkSessionValidity = () => {
        const token = localStorage.getItem('token');
        const loginTime = localStorage.getItem('loginTime');
        const userInfoRaw = localStorage.getItem('userInfo');
        const sessionDuration = parseSessionDuration(
            process.env.NEXT_PUBLIC_SESSION_DURATION || '1h'
        );

        if (token && loginTime && userInfoRaw) {
            const now = Date.now();
            const loginTimeMs = parseInt(loginTime, 10);

            if (now - loginTimeMs > sessionDuration) {
                logout();
            } else {
                try {
                    const info: UserInfo = JSON.parse(userInfoRaw);
                    setUser(info);
                } catch {
                    logout();
                }
            }
        } else {
            // Falta token, loginTime o userInfo
            setUser(null);
        }
    };

    useEffect(() => {
        checkSessionValidity();
        const interval = setInterval(checkSessionValidity, 60000);
        return () => clearInterval(interval);
    }, []);

    const login = async (identifier: string, password: string, useEmail: boolean) => {
        try {
            const payload: { username?: string; email?: string; password: string } = { password };
            if (useEmail) payload.email = identifier;
            else payload.username = identifier;

            const loginRes = await apiService.login(payload);
            const token = loginRes.access_token;
            localStorage.setItem('token', token);
            localStorage.setItem('loginTime', Date.now().toString());
            const userData = useEmail
                ? await apiService.getUserByEmail(identifier)
                : await apiService.getUserByUsername(identifier);

            const userInfo: UserInfo = {
                id: userData.id_usuario,
                username: userData.username,
                nombre: userData.nombre,
                email: userData.email
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            setUser(userInfo);
            router.push('/');
        } catch (err) {
            if (err instanceof Error) {
                alert('Error al iniciar sesión: ' + err.message);
            } else {
                alert('Error desconocido al iniciar sesión');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        setUser(null);
        router.push('/');
    };

    const register = async (data: RegisterData) => {
        try {
            const nuevoUsuario = await apiService.register(data);
            const idUsuario = nuevoUsuario.id_usuario;

            const rolRes = await apiService.asignarRolUsuario({ id_usuario: idUsuario });

            if (!rolRes) {
                alert('Usuario creado, pero error al asignar rol');
                return;
            }

            alert('Usuario registrado y rol asignado correctamente');
            router.push('/');
        } catch (err: any) {
            alert('Error inesperado al registrar' + err.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return ctx;
}