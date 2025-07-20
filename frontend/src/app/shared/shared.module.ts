import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyContentDirective } from '../directives/lazy-content.directive';
import { ModalComponent } from '../components/modal/modal.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LazyContentDirective,
        ModalComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LazyContentDirective,
        ModalComponent
    ]
})
export class SharedModule {}

