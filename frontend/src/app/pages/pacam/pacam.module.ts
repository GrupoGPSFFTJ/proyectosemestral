import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacamRoutingModule } from './pacam-routing.module';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ControlDesembolsoComponent } from './control-desembolso/control-desembolso.component';
import { InformesComponent } from './informes/informes.component';
import { InscripcionFormComponent } from './inscripciones/inscripcion-form/inscripcion-form.component';
import { ControlDesembolsoFormComponent } from './control-desembolso/control-desembolso-form/control-desembolso-form.component';
import { InformeFormComponent } from './informes/informe-form/informe-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ProgramasNutricionalesComponent } from './programas-nutricionales/programas-nutricionales.component';
import { ProgramaNutricionalFormComponent } from './programas-nutricionales/programa-nutricional-form/programa-nutricional-form.component';

@NgModule({
  declarations: [
    InscripcionesComponent,
    ControlDesembolsoComponent,
    InformesComponent,
    InscripcionFormComponent,
    ControlDesembolsoFormComponent,
    InformeFormComponent,
    ProgramasNutricionalesComponent,
    ProgramaNutricionalFormComponent
  ],
  imports: [
    CommonModule,
    PacamRoutingModule,
    SharedModule
  ]
})
export class PacamModule { }
