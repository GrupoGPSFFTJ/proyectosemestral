import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichasOdontologicaComponent } from './fichas-odontologica.component';

const routes: Routes = [
  { path: '', component: FichasOdontologicaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichasOdontologicaRoutingModule { }
