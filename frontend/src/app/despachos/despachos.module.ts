import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DespachosRoutingModule } from './despachos-routing.module';
import { DespachosComponent } from './despachos.component';


@NgModule({
  declarations: [
    DespachosComponent
  ],
  imports: [
    SharedModule,
    DespachosRoutingModule
  ]
})
export class DespachosModule { }
