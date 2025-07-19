import {
    Directive,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[appLazyContent]',
    standalone: true
})
export class LazyContentDirective implements OnInit, OnDestroy {

    @Input() appLazyContent: any;
    @Input() lazyDelay: number = 0;

    private observer?: IntersectionObserver;
    private isLoaded = false;

    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) { }

    ngOnInit() {
        // ✅ LAZY LOADING: Cargar contenido solo cuando es visible
        this.setupIntersectionObserver();
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private setupIntersectionObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isLoaded) {
                        this.loadContent();
                    }
                });
            },
            {
                threshold: 0.1 // Cargar cuando el 10% del elemento es visible
            }
        );

        this.observer.observe(this.element.nativeElement);
    }

    private async loadContent() {
        if (this.isLoaded) return;

        // Mostrar loading
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef, {
            $implicit: { loading: true }
        });

        // Esperar delay si se especifica
        if (this.lazyDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, this.lazyDelay));
        }

        // Cargar contenido real
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef, {
            $implicit: { loading: false, data: this.appLazyContent }
        });

        this.isLoaded = true;

        // Desconectar observer después de cargar
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
