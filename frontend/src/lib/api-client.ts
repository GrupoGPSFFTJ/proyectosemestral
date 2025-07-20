import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

@Injectable({
    providedIn: 'root'
})
export class ApiClient {
    private defaultHeaders = { 'Content-Type': 'application/json' };

    private getHeaders(withToken = true): Record<string, string> {
        const headers: Record<string, string> = { ...this.defaultHeaders };
        if (withToken) {
            const token = localStorage.getItem('token');
            if (token) headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    private getServiceUrl(path: string): string {
        const servicePrefix = path.split('/')[1];
        const serviceMapping: { [key: string]: keyof typeof environment.services } = {
            'core': 'core',
            'clinical': 'clinical',
            'nutrition': 'nutrition',
            'odonto': 'odonto',
            'patient': 'patient',
            'pharmacy': 'pharmacy',
            'vaccination': 'vaccination'
        };
        if (servicePrefix && serviceMapping[servicePrefix]) {
            return environment.services[serviceMapping[servicePrefix]];
        }
        throw new Error(`Servicio no encontrado para el path: ${path}`);
    }
    private cleanPath(path: string): string {
        const servicePrefix = path.split('/')[1];
        const serviceMapping = ['core', 'clinical', 'nutrition', 'odonto', 'patient', 'pharmacy', 'vaccination'];
        if (servicePrefix && serviceMapping.includes(servicePrefix)) {
            return path.replace(`/${servicePrefix}`, '');
        }
        
        return path;
    }

    private async request<T>(
        method: HTTPMethod,
        path: string,
        body?: any,
        withToken = true
    ): Promise<T> {
        const serviceUrl = this.getServiceUrl(path);
        const cleanedPath = this.cleanPath(path);
        const fullUrl = `${serviceUrl}${cleanedPath}`;
        const res = await fetch(fullUrl, {
            method,
            headers: this.getHeaders(withToken),
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error ${res.status} ${res.statusText}: ${errorText}`);
        }

        return res.json();
    }

    get<T>(path: string, withToken = true): Promise<T> {
        return this.request<T>('GET', path, undefined, withToken);
    }

    post<T>(path: string, body: any, withToken = true): Promise<T> {
        return this.request<T>('POST', path, body, withToken);
    }

    put<T>(path: string, body: any, withToken = true): Promise<T> {
        return this.request<T>('PUT', path, body, withToken);
    }

    delete<T>(path: string, withToken = true): Promise<T> {
        return this.request<T>('DELETE', path, undefined, withToken);
    }
}
