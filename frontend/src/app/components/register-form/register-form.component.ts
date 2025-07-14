import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ApiService} from '../../../services/api.service';

@Component({
    selector: 'app-register-form',
    standalone: false,
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
    @Output() switchToLogin = new EventEmitter<void>();

    centros: { id_centro_salud: number; nombre: string }[] = [];
    form = {
        username: '',
        password: '',
        nombre: '',
        email: '',
        id_centro_salud: ''
    };

    constructor(
        private authService: AuthService,
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.apiService.getCentrosSalud()
            .then(data => this.centros = data || [])
            .catch(() => alert('Error al cargar centros de salud'));
    }

    async onSubmit(): Promise<void> {
        try {
            await this.authService.register({
                ...this.form,
                id_centro_salud: parseInt(this.form.id_centro_salud),
            });
        } catch (error) {
            console.error('Register error:', error);
        }
    }
}
