import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { FamiliasComponent } from './familias.component';
import { FamiliaFormComponent } from './familia-form/familia-form.component';

@NgModule({
    declarations: [
        FamiliasComponent,
        FamiliaFormComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: FamiliasComponent }
        ])
    ]
})
export class FamiliasModule { }
