import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class QuickPreloadService {
    private preloadingModules = new Set<string>();

    constructor(private router: Router) { }
    async preloadOnDemand(routePath: string): Promise<void> {
        if (this.preloadingModules.has(routePath)) {
            return;
        }

        this.preloadingModules.add(routePath);

        try {
            const route = this.router.config.find(r => r.path === routePath);
            if (route && route.loadChildren) {
                await (route.loadChildren as any)();
            }
        } catch (error) {
            console.error(`❌ [QuickPreload] Error precargando ${routePath}:`, error);
        } finally {
            this.preloadingModules.delete(routePath);
        }
    }

    async preloadCriticalModules(): Promise<void> {
        const criticalModules = ['pacientes', 'citas', 'recetas'];
        const preloadPromises = criticalModules.map(module => this.preloadOnDemand(module));

        try {
            await Promise.all(preloadPromises);
        } catch (error) {
            console.error('❌ [QuickPreload] Error precargando módulos críticos:', error);
        }
    }
}
