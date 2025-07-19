import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Familia } from '../familias.interfaces';

@Component({
  selector: 'app-familia-form',
  standalone: false,
  templateUrl: './familia-form.component.html',
  styleUrl: './familia-form.component.css'
})
export class FamiliaFormComponent {
  @Input() familia: Familia | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onUpdate = new EventEmitter<Familia>();

  familiaForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.familiaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.isOpen) {
      if (this.familia) {
        this.familiaForm.patchValue({
          nombre: this.familia.nombre
        });
      } else {
        this.familiaForm.patchValue({
          nombre: ''
        });
      }

      this.familiaForm.markAsUntouched();
    }
  }

  async onSubmit() {
    if (this.familia) {
      const familia = await this.apiService.updateFamilia(this.familia.id_familia, this.familiaForm.value);
      alert('Familia actualizada correctamente');
      this.onUpdate.emit(familia);
    } else {
      const familia = await this.apiService.createFamilia(this.familiaForm.value);
      alert('Familia creada correctamente');
      this.onSave.emit(familia);
    }
  }

  onModalClose() {
    this.onClose.emit();
  }
}
