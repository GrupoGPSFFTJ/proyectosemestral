import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionPacam } from '../inscripcion-pacam.interface';
import { InscripcionPacamDataService } from '../../../../data-services/inscripcion-pacam-data.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-inscripcion-form',
  standalone: false,
  templateUrl: './inscripcion-form.component.html',
  styleUrl: './inscripcion-form.component.css'
})
export class InscripcionFormComponent {
  @Input() inscripcion: InscripcionPacam | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onUpdate = new EventEmitter<InscripcionPacam>();

  inscripcionForm: FormGroup;

  constructor(
    public data: InscripcionPacamDataService, 
    private fb: FormBuilder, 
    private apiService: ApiService
  ) {
    this.inscripcionForm = this.fb.group({
      fecha_inscripcion: ['', Validators.required],
      estado: ['', Validators.required],
      id_paciente: [''],
      id_centro_salud: ['', Validators.required],
      id_programa_nutricional: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      if (this.inscripcion) {
        this.inscripcionForm.patchValue({
          fecha_inscripcion: this.inscripcion.fecha_inscripcion,
          estado: this.inscripcion.estado,
          id_paciente: this.inscripcion.id_paciente,
          id_centro_salud: this.inscripcion.id_centro_salud,
          id_programa_nutricional: this.inscripcion.id_programa_nutricional
        });
      } else {
        this.inscripcionForm.patchValue({
          fecha_inscripcion: '',
          estado: '',
          id_paciente: '',
          id_centro_salud: '',
          id_programa_nutricional: ''
        });
      }

      this.inscripcionForm.markAsUntouched();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.inscripcion) {
      const inscripcion = await this.apiService.updateInscripcionPacam(this.inscripcion.id_inscripcion_pacam, this.inscripcionForm.value);
      alert('Inscripción PACAM actualizada correctamente');
      this.onUpdate.emit(inscripcion);
    } else {
      const inscripcion = await this.apiService.createInscripcionPacam(this.inscripcionForm.value);
      alert('Inscripción PACAM creada correctamente');
      this.onSave.emit(inscripcion);
    }
  }

  onModalClose(): void {
    this.onClose.emit();
  }
}
