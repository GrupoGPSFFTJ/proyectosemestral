import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CitasDataService } from '../../data-services';
import { Cita } from '../citas.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-cita-form',
  standalone: false,
  templateUrl: './cita-form.component.html',
  styleUrl: './cita-form.component.css'
})
export class CitaFormComponent {
  @Input() cita: Cita | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onUpdate = new EventEmitter<Cita>();

  citaForm: FormGroup

  constructor(public data: CitasDataService, private fb: FormBuilder, private apiService: ApiService) {
    this.citaForm = this.fb.group({
      id_paciente: ['', Validators.required],
      id_usuario: ['', Validators.required],
      id_centro_salud: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      tipo_cita: ['', Validators.required],
      observacion: ['']
    });
  }
  ngOnChanges() {
    if (this.isOpen) {
      if (this.cita) {
        this.citaForm.patchValue({
          id_paciente: this.cita.id_paciente,
          id_usuario: this.cita.id_usuario,
          id_centro_salud: this.cita.id_centro_salud,
          fecha: this.cita.fecha,
          hora: this.cita.hora,
          tipo_cita: this.cita.tipo_cita,
          observacion: this.cita.observacion || ''
        });
      } else {
        this.citaForm.patchValue({
          id_paciente: '',
          id_usuario: '',
          id_centro_salud: '',
          fecha: '',
          hora: '',
          tipo_cita: '',
          observacion: ''
        });
      }

      this.citaForm.markAsUntouched();
    }
  }
  async onSubmit() {
    //validacion en el template y deshabilitando el boton principal
    if (this.cita) {
      const cita = await this.apiService.updateCita(this.cita.id_cita, this.citaForm.value);
      alert('Cita actualizada correctamente');
      this.onUpdate.emit(cita);
    } else {
      // Crear nueva entidad
      const cita = await this.apiService.createCita(this.citaForm.value);
      alert('Cita creada correctamente');
      this.onSave.emit(cita);
    }
  }

  onModalClose() {
    this.onClose.emit();
  }
}
