import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlDesembolso } from '../control-desembolso.interface';
import { ControlDesembolsoDataService } from '../../../../data-services/control-desembolso-data.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-control-desembolso-form',
  standalone: false,
  templateUrl: './control-desembolso-form.component.html',
  styleUrls: ['./control-desembolso-form.component.css']
})
export class ControlDesembolsoFormComponent {
  @Input() desembolso: ControlDesembolso | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onUpdate = new EventEmitter<ControlDesembolso>();

  desembolsoForm: FormGroup;

  constructor(
    public data: ControlDesembolsoDataService, 
    private fb: FormBuilder, 
    private apiService: ApiService
  ) {
    this.desembolsoForm = this.fb.group({
      fecha_entrega: ['', Validators.required],
      cantidad_entregada: [0, [Validators.required, Validators.min(1)]],
      id_inscripcion_pacam: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      if (this.desembolso) {
        this.desembolsoForm.patchValue({
          fecha_entrega: this.desembolso.fecha_entrega,
          cantidad_entregada: this.desembolso.cantidad_entregada,
          id_inscripcion_pacam: this.desembolso.id_inscripcion_pacam
        });
      } else {
        this.desembolsoForm.patchValue({
          fecha_entrega: '',
          cantidad_entregada: 0,
          id_inscripcion_pacam: ''
        });
      }

      this.desembolsoForm.markAsUntouched();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.desembolso) {
      const desembolso = await this.apiService.updateControlDesembolso(this.desembolso.id_control_desembolso, this.desembolsoForm.value);
      alert('Control de desembolso actualizado correctamente');
      this.onUpdate.emit(desembolso);
    } else {
      const desembolso = await this.apiService.createControlDesembolso(this.desembolsoForm.value);
      alert('Control de desembolso creado correctamente');
      this.onSave.emit(desembolso);
    }
  }

  onModalClose(): void {
    this.onClose.emit();
  }
}
