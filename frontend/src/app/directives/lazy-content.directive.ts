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
                threshold: 0.1
            }
        );

        this.observer.observe(this.element.nativeElement);
    }

    private async loadContent() {
        if (this.isLoaded) return;

        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef, {
            $implicit: { loading: true }
        });

        if (this.lazyDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, this.lazyDelay));
        }

        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef, {
            $implicit: { loading: false, data: this.appLazyContent }
        });

        this.isLoaded = true;

        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
