import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-auth-gate',
    standalone: false,
    templateUrl: './auth-gate.component.html',
    styleUrls: ['./auth-gate.component.css']
})
export class AuthGateComponent implements OnInit, OnDestroy {
    isRegistering = false;
    isAuthenticated = false;
    private subscription: Subscription = new Subscription();

    constructor(
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.subscription = this.authService.user$.subscribe(user => {
            this.isAuthenticated = !!user;
            this.cdr.detectChanges(); // Forzar detección de cambios
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    toggleForm(): void {
        this.isRegistering = !this.isRegistering;
    }
}
