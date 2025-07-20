import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { FichasClinicaRoutingModule } from './fichas-clinica-routing.module';
import { FichasClinicaComponent } from './fichas-clinica.component';
import { FichaClinicaFormComponent } from './ficha-clinica-form/ficha-clinica-form.component';


@NgModule({
  declarations: [
    FichasClinicaComponent,
    FichaClinicaFormComponent
  ],
  imports: [
    SharedModule,
    FichasClinicaRoutingModule
  ]
})
export class FichasClinicaModule { }
