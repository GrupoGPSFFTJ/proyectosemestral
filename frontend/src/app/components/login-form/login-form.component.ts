import { Component, EventEmitter, Output } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-login-form',
    standalone: false,
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
    @Output() switchToRegister = new EventEmitter<void>();

    identifier = '';
    password = '';
    useEmail = false;
    hover = false;

    constructor(private authService: AuthService) { }

    toggleEmailMode(): void {
        this.useEmail = !this.useEmail;
    }

    async onSubmit(): Promise<void> {
        try {
            await this.authService.login(this.identifier, this.password, this.useEmail);
        } catch (error) {
            console.error('Login error:', error);
        }
    }
}
