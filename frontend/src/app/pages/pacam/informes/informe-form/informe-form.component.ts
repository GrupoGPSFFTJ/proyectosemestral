import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformePacam } from '../informe-pacam.interface';
import { InformePacamDataService } from '../../../../data-services/informe-pacam-data.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-informe-form',
  standalone: false,
  templateUrl: './informe-form.component.html',
  styleUrl: './informe-form.component.css'
})
export class InformeFormComponent {
  @Input() informe: InformePacam | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onUpdate = new EventEmitter<InformePacam>();

  informeForm: FormGroup;

  constructor(
    public data: InformePacamDataService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.informeForm = this.fb.group({
      fecha_informe: ['', Validators.required],
      total_beneficiario: ['', [Validators.required, Validators.min(0)]],
      total_desembolso: ['', [Validators.required, Validators.min(0)]],
      id_programa_nutricional: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      if (this.informe) {
        this.informeForm.patchValue({
          fecha_informe: this.informe.fecha_informe,
          total_beneficiario: this.informe.total_beneficiario,
          total_desembolso: this.informe.total_desembolso,
          id_programa_nutricional: this.informe.id_programa_nutricional
        });
      } else {
        this.informeForm.patchValue({
          fecha_informe: '',
          total_beneficiario: '',
          total_desembolso: '',
          id_programa_nutricional: ''
        });
      }

      this.informeForm.markAsUntouched();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.informe) {
      const informe = await this.apiService.updateInformePacam(this.informe.id_informe_pacam, this.informeForm.value);
      alert('Informe PACAM actualizado correctamente');
      this.onUpdate.emit(informe);
    } else {
      const informe = await this.apiService.createInformePacam(this.informeForm.value);
      alert('Informe PACAM creado correctamente');
      this.onSave.emit(informe);
    }
  }

  onModalClose(): void {
    this.onClose.emit();
  }
}
