import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService, UserInfo } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';

interface Card {
    label: string;
    count: number;
    href: string;
    icon: string;
}

@Component({
    selector: 'app-dashboard',
    standalone: false,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild('cardsWrapper') cardsWrapper!: ElementRef;

    cards: Card[] = [];
    showArrow = false;
    currentUser: UserInfo | null = null;

    constructor(
        private authService: AuthService,
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.currentUser = user;
        });
        this.fetchCounts();
    }

    ngAfterViewInit(): void {
        this.checkScroll();
        if (this.cardsWrapper) {
            this.cardsWrapper.nativeElement.addEventListener('scroll', () => this.checkScroll());
            window.addEventListener('resize', () => this.checkScroll());
        }
    }

    private async fetchCounts(): Promise<void> {
        try {
            const [
                pacientes,
                familias,
                fichasClinicas,
                fichasOdonto,
                citas,
                recetas,
                medicamentos,
                despachos,
            ] = await Promise.all([
                this.apiService.getPacientesCount().catch(() => 0) as unknown as number,
                this.apiService.getFamiliasCount().catch(() => 0) as unknown as number,
                this.apiService.getFichasClinicasCount().catch(() => 0) as unknown as number,
                this.apiService.getFichasOdontoCount().catch(() => 0) as unknown as number,
                this.apiService.getCitasCount().catch(() => 0) as unknown as number,
                this.apiService.getRecetasCount().catch(() => 0) as unknown as number,
                this.apiService.getMedicamentosCount().catch(() => 0) as unknown as number,
                this.apiService.getDespachosCount().catch(() => 0) as unknown as number,
            ]);

            this.cards = [
                { label: 'Pacientes', count: pacientes, href: '/pacientes', icon: '🩺' },
                { label: 'Familias', count: familias, href: '/familias', icon: '👨‍👩‍👧‍👦' },
                { label: 'Fichas Clínicas', count: fichasClinicas, href: '/fichas-clinica', icon: '📋' },
                { label: 'Fichas Odontológicas', count: fichasOdonto, href: '/fichas-odontologica', icon: '🦷' },
                { label: 'Citas', count: citas, href: '/citas', icon: '📅' },
                { label: 'Recetas', count: recetas, href: '/recetas', icon: '📝' },
                { label: 'Medicamentos', count: medicamentos, href: '/medicamentos', icon: '💊' },
                { label: 'Despachos', count: despachos, href: '/despachos', icon: '📦' },
            ];
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    }

    private checkScroll(): void {
        if (!this.cardsWrapper) return;
        const wrapper = this.cardsWrapper.nativeElement;
        if (wrapper.scrollWidth > wrapper.clientWidth &&
            wrapper.scrollLeft < wrapper.scrollWidth - wrapper.clientWidth - 10) {
            this.showArrow = true;
        } else {
            this.showArrow = false;
        }
    }

    getCardClass(label: string): string {
        switch (label) {
            case 'Pacientes': return 'card-pacientes';
            case 'Familias': return 'card-familias';
            case 'Fichas Clínicas': return 'card-fichas-clinicas';
            case 'Fichas Odontológicas': return 'card-fichas-odontologicas';
            case 'Citas': return 'card-citas';
            case 'Recetas': return 'card-recetas';
            case 'Medicamentos': return 'card-medicamentos';
            case 'Despachos': return 'card-despachos';
            default: return '';
        }
    }

    getIconClass(label: string): string {
        switch (label) {
            case 'Pacientes': return 'icon-pacientes';
            case 'Familias': return 'icon-familias';
            case 'Fichas Clínicas': return 'icon-fichas-clinicas';
            case 'Fichas Odontológicas': return 'icon-fichas-odontologicas';
            case 'Citas': return 'icon-citas';
            case 'Recetas': return 'icon-recetas';
            case 'Medicamentos': return 'icon-medicamentos';
            case 'Despachos': return 'icon-despachos';
            default: return '';
        }
    }
}
