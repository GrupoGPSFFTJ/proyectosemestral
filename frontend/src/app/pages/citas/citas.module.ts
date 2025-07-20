import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { CitaFormComponent } from './cita-form/cita-form.component';


@NgModule({
  declarations: [
    CitasComponent,
    CitaFormComponent
  ],
  imports: [
    SharedModule,
    CitasRoutingModule,
  ]
})
export class CitasModule { }
