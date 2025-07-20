
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ControlDesembolsoComponent } from './control-desembolso/control-desembolso.component';
import { InformesComponent } from './informes/informes.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProgramasNutricionalesComponent } from './programas-nutricionales/programas-nutricionales.component';

const routes: Routes = [
  { path: 'inscripciones', component: InscripcionesComponent },
  { path: 'control-desembolso', component: ControlDesembolsoComponent },
  { path: 'informes', component: InformesComponent },
  { path: 'programas-nutricionales', component: ProgramasNutricionalesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacamRoutingModule { }
