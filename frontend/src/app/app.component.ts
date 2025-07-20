import { Component, OnInit } from '@angular/core';
import { QuickPreloadService } from './services/quick-preload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend_angular';

  constructor(private quickPreloadService: QuickPreloadService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.quickPreloadService.preloadCriticalModules();
    }, 500); // Delay mínimo para no bloquear la inicialización
  }
}
