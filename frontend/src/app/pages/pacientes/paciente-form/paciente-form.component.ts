import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { PacientesDataService } from '../../../data-services/pacientes-data.service';
import { Paciente } from '../pacientes.interfaces';

@Component({
    selector: 'app-paciente-form',
    standalone: false,
    templateUrl: './paciente-form.component.html',
    styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent {
    @Input() paciente: Paciente | null = null;
    @Input() isOpen: boolean = false;
    @Output() onClose = new EventEmitter();
    @Output() onSave = new EventEmitter();
    @Output() onUpdate = new EventEmitter<Paciente>();

    pacienteForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        public pacientesDataService: PacientesDataService
    ) {
        this.pacienteForm = this.fb.group({
            nombre: ['', Validators.required],
            apellido_paterno: ['', Validators.required],
            apellido_materno: ['', Validators.required],
            rut: ['', Validators.required],
            fecha_nacimiento: ['', Validators.required],
            genero: ['', Validators.required],
            telefono: ['', Validators.required],
            direccion: ['', Validators.required]
        });
    }

    ngOnChanges() {
        if (this.isOpen) {
            if (this.paciente) {
                this.pacienteForm.patchValue({
                    nombre: this.paciente.nombre,
                    apellido_paterno: this.paciente.apellido_paterno,
                    apellido_materno: this.paciente.apellido_materno,
                    rut: this.paciente.rut,
                    fecha_nacimiento: this.paciente.fecha_nacimiento ? this.paciente.fecha_nacimiento.slice(0, 10) : '',
                    genero: this.paciente.genero,
                    telefono: this.paciente.telefono,
                    direccion: this.paciente.direccion
                });
            } else {
                this.pacienteForm.patchValue({
                    nombre: '',
                    apellido_paterno: '',
                    apellido_materno: '',
                    rut: '',
                    fecha_nacimiento: '',
                    genero: '',
                    telefono: '',
                    direccion: ''
                });
            }

            this.pacienteForm.markAsUntouched();
        }
    }

    async onSubmit() {
        if (this.paciente) {
            const paciente = await this.apiService.updatePaciente(this.paciente.id_paciente, this.pacienteForm.value);
            alert('Paciente actualizado correctamente');
            this.onUpdate.emit(paciente);
        } else {
            const paciente = await this.apiService.createPaciente(this.pacienteForm.value);
            alert('Paciente creado correctamente');
            this.onSave.emit(paciente);
        }
    }

    onModalClose() {
        this.onClose.emit();
    }
}
