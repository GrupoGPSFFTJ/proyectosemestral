import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespachosComponent } from './despachos.component';

const routes: Routes = [
  { path: '', component: DespachosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespachosRoutingModule { }
