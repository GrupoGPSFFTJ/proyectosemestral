import { Component, OnChanges, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

interface Entity {}

@Component({
    selector: 'app-form-sheet',
    template: `<div></div>`
})
export class FormSheetComponent implements OnChanges {
    @Input() entity: Entity | null = null;
    @Input() isOpen: boolean = false;
    @Output() onClose = new EventEmitter<boolean>();
    entityForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.entityForm = this.fb.group({});
    }
    ngOnChanges() {
        if (this.isOpen) {
            if (this.entity) {
                this.entityForm.patchValue({});
                this.entityForm.markAsUntouched();
            } else {
                this.entityForm.reset();
                this.entityForm.markAsUntouched();
            }
        }
    }
    async onSubmit() {
        if (this.entity) {
        } else {
        }
        this.onClose.emit(true);
    }
    onModalClose() {
        this.onClose.emit(false);
    }
}