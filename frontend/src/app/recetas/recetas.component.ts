import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecetasDataService } from '../data-services/recetas-data.service';
import {
  Receta,
  RecetaMedicamento,
  RecetaMedicamentoForm
} from './recetas.interfaces';

// Interfaces para el componente

@Component({
  selector: 'app-recetas',
  standalone: false,
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent implements OnInit {
  recetas: Receta[] = [];
  showModal = false;
  detalleReceta: RecetaMedicamento[] | null = null;
  showDetalle = false;
  detalleTitulo = '';
  loading = true;

  form = {
    id_paciente: '',
    id_medico: '',
    indicacion: '',
    items: [] as RecetaMedicamentoForm[],
  };

  UNIDADES_DOSIS = ['tableta(s)', 'ml', 'mg', 'gota(s)', 'cucharada(s)', 'capsula(s)'];

  constructor(
    private apiService: ApiService,
    private recetasDataService: RecetasDataService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      // ✅ OPTIMIZACIÓN: Cargar datos principales Y estáticos EN PARALELO
      const [recetasData] = await Promise.all([
        this.apiService.getRecetas(),
        this.recetasDataService.loadStaticData() // Se ejecuta en paralelo, no bloquea
      ]);

      // Mostrar las recetas inmediatamente
      this.recetas = recetasData;
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar datos:', error);
      this.loading = false;
    }
  }

  // Métodos para obtener nombres
  getPacienteNombre(id_paciente: number): string {
    return this.recetasDataService.getPacienteNombre(id_paciente);
  }

  getUsuarioNombre(id_usuario: number): string {
    return this.recetasDataService.getMedicoNombre(id_usuario);
  }

  getMedicoNombre(id_medico: number): string {
    return this.recetasDataService.getMedicoNombre(id_medico);
  }

  getMedicamentoNombre(id_medicamento: number): string {
    return this.recetasDataService.getMedicamentoNombre(id_medicamento);
  }

  // Métodos para formularios
  getPacientes() {
    return this.recetasDataService.getPacientesForSelect();
  }

  getUsuarios() {
    return this.recetasDataService.getUsuariosForSelect();
  }

  getMedicamentos() {
    return this.recetasDataService.getMedicamentosForSelect();
  }

  // Modal handlers
  handleOpenModal(): void {
    this.showModal = true;
  }

  handleCloseModal(): void {
    this.showModal = false;
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.form = { ...this.form, [target.name]: target.value };
  }

  handleItemChange(idx: number, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const items = [...this.form.items];
    items[idx] = { ...items[idx], [target.name]: target.value };
    this.form = { ...this.form, items };
  }

  handleAddItem(): void {
    this.form = {
      ...this.form,
      items: [
        ...this.form.items,
        {
          id_medicamento: '',
          dosis_cantidad: '',
          dosis_unidad: '',
          frecuencia_horas: '',
          duracion_dias: '',
        },
      ],
    };
  }

  handleRemoveItem(idx: number): void {
    const items = [...this.form.items];
    items.splice(idx, 1);
    this.form = { ...this.form, items };
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

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    try {
      // 1. Crear receta
      const recetaPayload = {
        id_paciente: Number(this.form.id_paciente),
        id_medico: Number(this.form.id_medico),
        fecha_emision: new Date().toISOString().slice(0, 19).replace('T', ' '), // now()
        indicacion: this.form.indicacion,
      };
      const receta = await this.apiService.createReceta(recetaPayload);

      // 2. Crear ítems de receta y despachos
      for (const item of this.form.items) {
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
          id_farmacia: 1, // puedes ajustar según tu lógica
        });
      }

      this.form = {
        id_paciente: '',
        id_medico: '',
        indicacion: '',
        items: [],
      };
      this.recetas = await this.apiService.getRecetas();
      this.showModal = false;
      alert('Receta creada y despachos generados');
    } catch (error) {
      alert('Error al crear receta');
      console.error('Error:', error);
    }
  }

  async handleVerDetalle(receta: Receta): Promise<void> {
    try {
      const response = await this.apiService.getRecMedByReceta(receta.id_receta);
      const items = Array.isArray(response) ? response : [response];
      this.detalleReceta = items;
      this.detalleTitulo = `Detalle de receta #${receta.id_receta}`;
      this.showDetalle = true;
    } catch (error) {
      console.error('Error al cargar detalle:', error);
    }
  }

  handleCerrarDetalle(): void {
    this.showDetalle = false;
    this.detalleReceta = null;
    this.detalleTitulo = '';
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CL');
  }
}
