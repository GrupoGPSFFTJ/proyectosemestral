import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
    private preloadedModules = new Set<string>();

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // ✅ LAZY LOADING OPTIMIZADO: Precargar módulos inmediatamente o con delay mínimo
        const shouldPreload = this.shouldPreload(route);

        if (shouldPreload) {
            const delay = this.getPreloadDelay(route.path || '');

            return timer(delay).pipe(
                switchMap(() => {
                    this.markAsPreloaded(route.path || '');
                    return load();
                })
            );
        }

        return of(null);
    }

    private getPreloadDelay(routePath: string): number {
        // Delays optimizados por prioridad
        const priorities = {
            'pacientes': 100,    // 🏥 Inmediato - datos críticos
            'citas': 200,        // 📅 Muy rápido - sistema principal  
            'recetas': 300,      // 💊 Rápido - prescripciones
            'medicamentos': 500, // 💉 Medio - catálogo
            'fichas-clinica': 700 // 📋 Medio - historiales
        };

        return priorities[routePath as keyof typeof priorities] || 1000;
    }

    private shouldPreload(route: Route): boolean {
        // Lista de módulos prioritarios para precargar
        const priorityModules = [
            'pacientes',        // 🏥 Alta prioridad - datos de pacientes
            'citas',           // 📅 Alta prioridad - sistema de citas
            'recetas',         // 💊 Alta prioridad - prescripciones
            'medicamentos',    // 💉 Prioridad media - catálogo de medicamentos
            'fichas-clinica'   // 📋 Prioridad media - historiales clínicos
        ];

        return route.path ? priorityModules.includes(route.path) && !this.isPreloaded(route.path) : false;
    }

    /**
     * ✅ OPTIMIZACIÓN: Marcar módulo como precargado
     */
    markAsPreloaded(routePath: string): void {
        this.preloadedModules.add(routePath);
    }

    /**
     * ✅ OPTIMIZACIÓN: Verificar si ya está precargado
     */
    isPreloaded(routePath: string): boolean {
        return this.preloadedModules.has(routePath);
    }
}
