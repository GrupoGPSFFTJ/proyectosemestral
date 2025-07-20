import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { CitaFormComponent } from './cita-form/cita-form.component';
import { ModalComponent } from '../../components/modal/modal.component';


@NgModule({
  declarations: [
    CitasComponent,
    CitaFormComponent
  ],
  imports: [
    SharedModule, // ✅ LAZY LOADING: Incluye LazyContentDirective y CommonModule
    FormsModule,
    CitasRoutingModule,
    ModalComponent
  ]
})
export class CitasModule { }
