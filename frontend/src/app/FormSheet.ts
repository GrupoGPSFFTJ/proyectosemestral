import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

// Define una interfaz para la entidad que se va a manejar en el formulario
// Esto es opcional, pero ayuda a mantener el código organizado y tipado.
interface Entity {
    // Agrega las propiedades relevantes para tu entidad
}

@Component({
    selector: 'app-form-sheet',
    template: `<div></div>`
})
export class FormSheetComponent implements OnChanges {
    @Input() entity: Entity | null = null;
    @Input() isOpen: boolean = false;
    @Output() onClose = new EventEmitter<boolean>();

    entityForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.entityForm = this.fb.group({
            // Definir los campos del formulario
        });
    }

    ngOnChanges() {
        if (this.isOpen) {
            if (this.entity) {
                // Modo edición - cargar datos directamente (sin reset)
                this.entityForm.patchValue({
                    //asignar el valor de la entidad al formulario en caso de edición
                });
                this.entityForm.markAsUntouched();
            } else {
                // Modo creación - resetear
                this.entityForm.reset();
                this.entityForm.markAsUntouched();
            }
        }
    }

    async onSubmit() {
        //validacion en el template y deshabilitando el boton principal
        if (this.entity) {
            // Actualizar entidad existente
        } else {
            // Crear nueva entidad
        }
        this.onClose.emit(true); // Cerrar modal y notificar éxito
    }

    onModalClose() {
        this.onClose.emit(false);
    }
}