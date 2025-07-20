import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichasClinicaComponent } from './fichas-clinica.component';

const routes: Routes = [
  { path: '', component: FichasClinicaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichasClinicaRoutingModule { }
