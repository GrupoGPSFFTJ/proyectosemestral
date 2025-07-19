import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: false,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  showModal = false;
  showFormModal = false;

  citaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.citaForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['']
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openFormModal() {
    this.showFormModal = true;
  }

  closeFormModal() {
    this.showFormModal = false;
    this.citaForm.reset();
  }

  saveForm() {
    if (this.citaForm.valid) {
      console.log('Datos del formulario:', this.citaForm.value);
      alert('Formulario guardado exitosamente!');
      this.closeFormModal();
    }
  }
}
