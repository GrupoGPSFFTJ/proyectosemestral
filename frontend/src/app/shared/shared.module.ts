import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyContentDirective } from '../directives/lazy-content.directive';
import { ModalComponent } from '../components/modal/modal.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LazyContentDirective, // ✅ LAZY LOADING: Directiva standalone
        ModalComponent // ✅ UI: Componente modal standalone
    ],
    exports: [
        // Módulos de Angular comunes
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // Directivas/Componentes personalizados
        LazyContentDirective,
        ModalComponent // ✅ UI: Disponible en todos los módulos

        // Aquí irían pipes, componentes UI comunes, etc.
    ]
})
export class SharedModule {

    // 🎯 PROPÓSITO DEL SHARED MODULE:
    // 1. Evitar duplicación de imports en cada módulo
    // 2. Centralizar dependencias comunes (CommonModule, FormsModule, etc.)
    // 3. Compartir componentes/directivas/pipes personalizados
    // 4. Mantener consistency en toda la app
    // 5. Facilitar mantenimiento (cambios en un solo lugar)

}
