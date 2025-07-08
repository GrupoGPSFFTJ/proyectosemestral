type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class ApiClient {
    private baseUrl = process.env.NEXT_PUBLIC_API_URL;
    private defaultHeaders = {'Content-Type': 'application/json'};

    get<T>(path: string, withToken = true): Promise<T | void> {
        return this.request<T>('GET', path, undefined, withToken);
    }

    post<T>(path: string, body: any, withToken = true): Promise<T | void> {
        return this.request<T>('POST', path, body, withToken);
    }

    put<T>(path: string, body: any, withToken = true): Promise<T | void> {
        return this.request<T>('PUT', path, body, withToken);
    }

    delete<T>(path: string, withToken = true): Promise<T | void> {
        return this.request<T>('DELETE', path, undefined, withToken);
    }

    private getHeaders(withToken = true) {
        const headers: Record<string, string> = {...this.defaultHeaders};
        if (withToken) {
            const token = localStorage.getItem('token');
            if (token) headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    private async request<T>(
        method: HTTPMethod,
        path: string,
        body?: any,
        withToken = true
    ): Promise<T | void> {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers: this.getHeaders(withToken),
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error ${res.status} ${res.statusText}: ${errorText}`);
        }

        // Comprobación centralizada de contenido vacío
        const contentLength = res.headers.get('Content-Length');
        const contentType = res.headers.get('Content-Type');
        if (!contentLength || parseInt(contentLength) === 0 || !contentType) {
            return; // Respuesta vacía, retorna undefined
        }

        // Si hay contenido, procesarlo como JSON
        return res.json();
    }
}