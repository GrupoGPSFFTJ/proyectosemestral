import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Receta, RecetaMedicamentoForm } from '../recetas.interfaces';
import { RecetasDataService } from '../../../data-services/recetas-data.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-receta-form',
  standalone: false,
  templateUrl: './receta-form.component.html',
  styleUrl: './receta-form.component.css'
})
export class RecetaFormComponent implements OnChanges {
  @Input() receta: Receta | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  recetaForm: FormGroup;
  UNIDADES_DOSIS = ['ml', 'mg', 'g', 'tableta(s)', 'gota(s)', 'cucharada(s)', 'capsula(s)'];

  constructor(public data: RecetasDataService, private fb: FormBuilder, private apiService: ApiService) {
    this.recetaForm = this.fb.group({
      id_paciente: ['', Validators.required],
      id_medico: ['', Validators.required],
      indicacion: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpen) {
      if (this.receta) {
        this.recetaForm.patchValue({
          id_paciente: this.receta.id_paciente,
          id_medico: this.receta.id_medico,
          indicacion: this.receta.indicacion
        });

        // Obtener los items desde el backend
        this.data.getRecMedByRecetaForForm(this.receta.id_receta).then((items: RecetaMedicamentoForm[]) => {
          this.items.clear();
          items.forEach(item => {
            this.items.push(this.fb.group({
              id_medicamento: [item.id_medicamento, Validators.required],
              dosis_cantidad: [item.dosis_cantidad, Validators.required],
              dosis_unidad: [item.dosis_unidad, Validators.required],
              frecuencia_horas: [item.frecuencia_horas, Validators.required],
              duracion_dias: [item.duracion_dias, Validators.required]
            }));
          });
        });
      } else {
        this.recetaForm.patchValue({
          id_paciente: '',
          id_medico: '',
          indicacion: ''
        });
        this.items.clear();
      }
      this.recetaForm.markAsUntouched();
    }
  }

  get items(): FormArray {
    return this.recetaForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      id_medicamento: ['', Validators.required],
      dosis_cantidad: ['', Validators.required],
      dosis_unidad: ['', Validators.required],
      frecuencia_horas: ['', Validators.required],
      duracion_dias: ['', Validators.required]
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // Calcula la cantidad a despachar
  calcularCantidadDespachada(
    dosis_cantidad: string,
    frecuencia_horas: string,
    duracion_dias: string,
    dosis_unidad: string
  ): string {
    const dosisNum = parseFloat(dosis_cantidad || '1');
    const frecuenciaNum = parseFloat(frecuencia_horas || '1');
    const diasNum = parseInt(duracion_dias || '1', 10);

    const vecesPorDia = frecuenciaNum > 0 ? 24 / frecuenciaNum : 1;
    const total = Math.ceil(dosisNum * vecesPorDia * diasNum);
    return `${total} ${dosis_unidad}`;
  }

  async onSubmit() {
    try {
      if (this.receta) {
        // Actualizar receta existente
        const recetaData = {
          id_paciente: this.recetaForm.value.id_paciente,
          id_medico: this.recetaForm.value.id_medico,
          indicacion: this.recetaForm.value.indicacion
        };
        const receta = await this.apiService.updateReceta(this.receta.id_receta, recetaData);

        // TODO: Manejar actualización de RecetaMedicamento
        alert('Receta actualizada correctamente');
        this.onUpdate.emit(receta);
      } else {
        // Crear nueva receta - usando la lógica exacta del componente principal

        // 1. Crear receta
        const recetaPayload = {
          id_paciente: Number(this.recetaForm.value.id_paciente),
          id_medico: Number(this.recetaForm.value.id_medico),
          fecha_emision: new Date().toISOString().slice(0, 19).replace('T', ' '), // now()
          indicacion: this.recetaForm.value.indicacion,
        };
        const receta = await this.apiService.createReceta(recetaPayload);

        // 2. Crear ítems de receta y despachos
        const items = this.recetaForm.value.items;
        for (const item of items) {
          const recetaMedPayload = {
            id_receta: receta.id_receta,
            id_medicamento: Number(item.id_medicamento),
            dosis: `${item.dosis_cantidad} ${item.dosis_unidad}`,
            frecuencia: `${item.frecuencia_horas} hora(s)`,
            duracion_dias: Number(item.duracion_dias),
          };
          const recetaMed = await this.apiService.createRecetaMedicamento(recetaMedPayload);

          // Despacho automático (now + 1 hora)
          const fecha_despacho = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
          const cantidad_despachada = this.calcularCantidadDespachada(
            item.dosis_cantidad,
            item.frecuencia_horas,
            item.duracion_dias,
            item.dosis_unidad
          );
          await this.apiService.createDespachoMedicamento({
            id_receta_med: recetaMed.id_receta_medicamento,
            fecha_despacho,
            cantidad_despachada,
          });
        }

        alert('Receta creada y despachos generados');
        this.onSave.emit(receta);
      }
    } catch (error) {
      console.error('Error al procesar receta:', error);
      alert('Error al procesar la receta');
    }
  }

  onModalClose() {
    this.onClose.emit();
  }
}
