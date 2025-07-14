import { Injectable, ComponentRef, ViewContainerRef, Type } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LazyComponentLoader {

    async loadComponent<T>(
        componentFactory: () => Promise<Type<T>>,
        viewContainer: ViewContainerRef
    ): Promise<ComponentRef<T>> {

        // Mostrar loading mientras carga
        viewContainer.clear();
        const loadingElement = viewContainer.element.nativeElement.parentElement;
        if (loadingElement) {
            loadingElement.innerHTML = '<div class="loading-spinner">⏳ Cargando...</div>';
        }

        try {
            // Cargar el componente dinámicamente
            const component = await componentFactory();

            // Limpiar loading
            if (loadingElement) {
                loadingElement.innerHTML = '';
            }

            // Crear el componente
            const componentRef = viewContainer.createComponent(component);

            return componentRef;

        } catch (error) {
            console.error('❌ [LazyComponentLoader] Error cargando componente:', error);

            if (loadingElement) {
                loadingElement.innerHTML = '<div class="error-message">❌ Error al cargar</div>';
            }

            throw error;
        }
    }
}
