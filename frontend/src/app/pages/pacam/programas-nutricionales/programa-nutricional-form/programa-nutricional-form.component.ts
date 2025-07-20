import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramasNutricionales } from '../programas-nutricionales.interface';

@Component({
  selector: 'app-programa-nutricional-form',
  standalone: false,
  templateUrl: './programa-nutricional-form.component.html',
  styleUrls: ['./programa-nutricional-form.component.css']
})
export class ProgramaNutricionalFormComponent implements OnChanges {
  @Input() programa: ProgramasNutricionales | null = null;
  @Input() isOpen: boolean = false;
  @Output() onSave = new EventEmitter<ProgramasNutricionales>();
  @Output() onUpdate = new EventEmitter<ProgramasNutricionales>();
  @Output() onClose = new EventEmitter<void>();

  programaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.programaForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      activo: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      if (this.programa) {
        // Editing mode
        this.programaForm.patchValue({
          codigo: this.programa.codigo,
          nombre: this.programa.nombre,
          descripcion: this.programa.descripcion,
          activo: this.programa.activo
        });
      } else {
        // Create mode
        this.programaForm.reset({
          codigo: '',
          nombre: '',
          descripcion: '',
          activo: ''
        });
      }
      this.programaForm.markAsUntouched();
    }
  }

  onSubmit(): void {
    if (this.programaForm.valid) {
      const formData = this.programaForm.value;
      
      if (this.programa) {
        // Update mode
        const updatedPrograma: ProgramasNutricionales = {
          ...this.programa,
          ...formData
        };
        this.onUpdate.emit(updatedPrograma);
      } else {
        // Create mode
        this.onSave.emit(formData);
      }
    }
  }

  onModalClose(): void {
    this.programaForm.reset();
    this.onClose.emit();
  }
}
