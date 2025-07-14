import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MedicamentosRoutingModule } from './medicamentos-routing.module';
import { MedicamentosComponent } from './medicamentos.component';
import { MedicamentoFormComponent } from './medicamento-form/medicamento-form.component';


@NgModule({
  declarations: [
    MedicamentosComponent,
    MedicamentoFormComponent
  ],
  imports: [
    SharedModule,
    MedicamentosRoutingModule
  ]
})
export class MedicamentosModule { }
