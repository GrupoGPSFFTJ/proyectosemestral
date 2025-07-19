import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class QuickPreloadService {
    private preloadingModules = new Set<string>();

    constructor(private router: Router) { }

    /**
     * ✅ OPTIMIZACIÓN: Precargar módulo inmediatamente cuando se detecta intención de navegación
     */
    async preloadOnDemand(routePath: string): Promise<void> {
        if (this.preloadingModules.has(routePath)) {
            return; // Ya se está precargando
        }

        this.preloadingModules.add(routePath);

        try {
            // Usar el router para precargar el módulo
            const route = this.router.config.find(r => r.path === routePath);
            if (route && route.loadChildren) {
                // Esto precarga el módulo inmediatamente
                await (route.loadChildren as any)();
            }
        } catch (error) {
            console.error(`❌ [QuickPreload] Error precargando ${routePath}:`, error);
        } finally {
            this.preloadingModules.delete(routePath);
        }
    }

    /**
     * ✅ OPTIMIZACIÓN: Precargar múltiples módulos críticos al mismo tiempo
     */
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
