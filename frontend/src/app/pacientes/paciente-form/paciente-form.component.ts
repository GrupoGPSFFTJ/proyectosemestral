import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-paciente-form',
    standalone: false,
    templateUrl: './paciente-form.component.html',
    styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit, OnChanges {
    @Input() paciente: any = null;
    @Input() show = false;
    @Output() close = new EventEmitter<boolean>();

    generos: string[] = [];
    form = {
        direccion: '',
        rut: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        genero: '',
        telefono: ''
    };

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getGeneros()
            .then(data => this.generos = data)
            .catch(err => console.error('Error al cargar géneros:', err));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['paciente'] || changes['show']) {
            this.updateForm();
        }
    }

    private updateForm(): void {
        if (this.paciente) {
            this.form = {
                direccion: this.paciente.direccion || '',
                rut: this.paciente.rut || '',
                nombre: this.paciente.nombre || '',
                apellido_paterno: this.paciente.apellido_paterno || '',
                apellido_materno: this.paciente.apellido_materno || '',
                fecha_nacimiento: this.paciente.fecha_nacimiento ? this.paciente.fecha_nacimiento.slice(0, 10) : '',
                genero: this.paciente.genero || '',
                telefono: this.paciente.telefono || ''
            };
        } else {
            this.form = {
                direccion: '',
                rut: '',
                nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                fecha_nacimiento: '',
                genero: '',
                telefono: ''
            };
        }
    }

    async handleSubmit(): Promise<void> {
        try {
            if (this.paciente && this.paciente.id_paciente) {
                await this.apiService.updatePaciente(this.paciente.id_paciente, this.form);
                alert('Paciente actualizado correctamente');
            } else {
                await this.apiService.createPaciente(this.form);
                alert('Paciente creado correctamente');
            }
            this.close.emit(true);
        } catch (err: any) {
            console.error(err);
            alert('Error al guardar paciente: ' + err.message);
        }
    }

    handleCloseModal(): void {
        this.close.emit();
    }
}
