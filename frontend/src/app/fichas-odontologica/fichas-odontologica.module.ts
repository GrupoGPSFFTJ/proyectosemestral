import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { FichasOdontologicaRoutingModule } from './fichas-odontologica-routing.module';
import { FichasOdontologicaComponent } from './fichas-odontologica.component';
import { FichaOdontologicaFormComponent } from './ficha-odontologica-form/ficha-odontologica-form.component';


@NgModule({
  declarations: [
    FichasOdontologicaComponent,
    FichaOdontologicaFormComponent
  ],
  imports: [
    SharedModule,
    FichasOdontologicaRoutingModule
  ]
})
export class FichasOdontologicaModule { }
