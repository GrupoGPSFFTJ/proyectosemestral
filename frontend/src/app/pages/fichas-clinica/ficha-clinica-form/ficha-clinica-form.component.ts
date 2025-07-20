

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FichaClinica } from '../fichas-clinica.interfaces';
import { FichasClinicaDataService } from '../../../data-services/fichas-clinica-data.service';

@Component({
  selector: 'app-ficha-clinica-form',
  standalone: false,
  templateUrl: './ficha-clinica-form.component.html',
  styleUrl: './ficha-clinica-form.component.css'
})
export class FichaClinicaFormComponent implements OnChanges {
  @Input() ficha: FichaClinica | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<FichaClinica>();
  @Output() onUpdate = new EventEmitter<FichaClinica>();
  fichaForm: FormGroup;
  data: FichasClinicaDataService;
  constructor(private fb: FormBuilder, dataService: FichasClinicaDataService) {
    this.data = dataService;
    this.fichaForm = this.fb.group({
      id_paciente: ['', Validators.required],
      id_programa_control: ['', Validators.required],
      id_centro_salud: ['', Validators.required],
      id_usuario_responsable: ['', Validators.required],
      fecha_control: ['', Validators.required],
      observacion: ['']
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpen) {
      if (this.ficha) {
        this.fichaForm.patchValue({
          id_paciente: this.ficha.id_paciente,
          id_programa_control: this.ficha.id_programa_control,
          id_centro_salud: this.ficha.id_centro_salud,
          id_usuario_responsable: this.ficha.id_usuario_responsable,
          fecha_control: this.ficha.fecha_control ? this.ficha.fecha_control.slice(0, 10) : '',
          observacion: this.ficha.observacion || ''
        });
      } else {
        this.fichaForm.patchValue({
          id_paciente: '',
          id_programa_control: '',
          id_centro_salud: '',
          id_usuario_responsable: '',
          fecha_control: '',
          observacion: ''
        });
      }
      this.fichaForm.markAsUntouched();
    }
  }
  async onSubmit() {
    if (this.ficha) {
      const fichaActualizada = { ...this.ficha, ...this.fichaForm.value };
      this.onUpdate.emit(fichaActualizada);
    } else {
      this.onSave.emit(this.fichaForm.value);
    }
  }
  onModalClose() {
    this.onClose.emit();
  }
}
