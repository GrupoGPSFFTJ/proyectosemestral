import { Component, OnInit, HostListener } from '@angular/core';
import {AuthService, UserInfo} from '../../../services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: false,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser: UserInfo | null = null;
    dropdownOpen = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.currentUser = user;
        });
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
    }

    logout(): void {
        this.authService.logout();
        this.dropdownOpen = false;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.user-container')) {
            this.dropdownOpen = false;
        }
    }
}
