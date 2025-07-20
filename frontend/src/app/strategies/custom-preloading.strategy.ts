import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
    private preloadedModules = new Set<string>();

    preload(route: Route, load: () => Observable<any>): Observable<any> {
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
        const priorities = {
            'pacientes': 100,
            'citas': 200,
            'recetas': 300,
            'medicamentos': 500,
            'fichas-clinica': 700
        };
        return priorities[routePath as keyof typeof priorities] || 1000;
    }

    private shouldPreload(route: Route): boolean {
        const priorityModules = [
            'pacientes',
            'citas',
            'recetas',
            'medicamentos',
            'fichas-clinica'
        ];
        return route.path ? priorityModules.includes(route.path) && !this.isPreloaded(route.path) : false;
    }

    markAsPreloaded(routePath: string): void {
        this.preloadedModules.add(routePath);
    }

    isPreloaded(routePath: string): boolean {
        return this.preloadedModules.has(routePath);
    }
}
