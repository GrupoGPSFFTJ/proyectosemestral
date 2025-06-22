type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class ApiClient {
    private baseUrl = process.env.NEXT_PUBLIC_API_URL;
    private defaultHeaders = {'Content-Type': 'application/json'};

    private getHeaders(withToken = false) {
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
        withToken = false
    ): Promise<T> {
        const res = await fetch(`${this.baseUrl}${path}`, {
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

    get<T>(path: string, withToken = false): Promise<T> {
        return this.request<T>('GET', path, undefined, withToken);
    }

    post<T>(path: string, body: any, withToken = false): Promise<T> {
        return this.request<T>('POST', path, body, withToken);
    }

    put<T>(path: string, body: any, withToken = false): Promise<T> {
        return this.request<T>('PUT', path, body, withToken);
    }

    delete<T>(path: string, withToken = false): Promise<T> {
        return this.request<T>('DELETE', path, undefined, withToken);
    }
}
