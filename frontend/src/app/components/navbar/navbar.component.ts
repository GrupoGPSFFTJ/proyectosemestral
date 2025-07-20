import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService, UserInfo } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: UserInfo | null = null;
  pacamOpen = false;
  userOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.currentUser = user);
  }

  togglePacam() {
    this.pacamOpen = !this.pacamOpen;
    this.userOpen = false;
  }

  toggleUser() {
    this.userOpen = !this.userOpen;
    this.pacamOpen = false;
  }

  closeDropdowns() {
    this.pacamOpen = false;
    this.userOpen = false;
  }

  logout() {
    this.authService.logout();
    this.closeDropdowns();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('nav')) {
      this.closeDropdowns();
    }
  }
}
