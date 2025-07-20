import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PacientesComponent } from './pacientes.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';

@NgModule({
    declarations: [
        PacientesComponent,
        PacienteFormComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: PacientesComponent }
        ])
    ]
})
export class PacientesModule { }
