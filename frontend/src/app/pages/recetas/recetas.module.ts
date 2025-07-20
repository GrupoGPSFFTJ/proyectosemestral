import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { RecetasRoutingModule } from './recetas-routing.module';
import { RecetasComponent } from './recetas.component';
import { RecetaFormComponent } from './receta-form/receta-form.component';


@NgModule({
  declarations: [
    RecetasComponent,
    RecetaFormComponent
  ],
  imports: [
    SharedModule, // ✅ Incluye: CommonModule, FormsModule, ReactiveFormsModule, LazyContentDirective
    RecetasRoutingModule
  ]
})
export class RecetasModule { }
