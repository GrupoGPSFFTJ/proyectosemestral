import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Medicamento } from '../medicamentos.interfaces';

@Component({
  selector: 'app-medicamento-form',
  standalone: false,
  templateUrl: './medicamento-form.component.html',
  styleUrl: './medicamento-form.component.css'
})
export class MedicamentoFormComponent {
  @Input() medicamento: Medicamento | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onUpdate = new EventEmitter<Medicamento>();

  medicamentoForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.medicamentoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.isOpen) {
      if (this.medicamento) {
        this.medicamentoForm.patchValue({
          nombre: this.medicamento.nombre,
          descripcion: this.medicamento.descripcion
        });
      } else {
        this.medicamentoForm.patchValue({
          nombre: '',
          descripcion: ''
        });
      }

      this.medicamentoForm.markAsUntouched();
    }
  }

  async onSubmit() {
    if (this.medicamento) {
      const medicamento = await this.apiService.updateMedicamento(this.medicamento.id_medicamento, this.medicamentoForm.value);
      alert('Medicamento actualizado correctamente');
      this.onUpdate.emit(medicamento);
    } else {
      const medicamento = await this.apiService.createMedicamento(this.medicamentoForm.value);
      alert('Medicamento creado correctamente');
      this.onSave.emit(medicamento);
    }
  }

  onModalClose() {
    this.onClose.emit();
  }
}
