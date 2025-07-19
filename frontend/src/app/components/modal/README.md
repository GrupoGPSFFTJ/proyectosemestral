# Modal Genérico - Documentación

## Descripción
Componente modal genérico reutilizable para toda la aplicación. Incluye funcionalidades como cierre al hacer click fuera, botón de cierre, diferentes tamaños y contenido personalizable.

## Uso Básico

### 1. En tu componente TypeScript:
```typescript
export class MiComponente {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
```

### 2. En tu template HTML:
```html
<!-- Botón para abrir modal -->
<button (click)="openModal()" class="btn-crear">
  Abrir Modal
</button>

<!-- Modal genérico -->
<app-modal 
  [isOpen]="showModal" 
  [title]="'Título del Modal'"
  [size]="'medium'"
  (closeModal)="closeModal()"
>
  <!-- Contenido del modal -->
  <div class="form-field">
    <label class="form-label">Nombre:</label>
    <input type="text" class="form-input" placeholder="Ingresa tu nombre">
  </div>
  
  <!-- Footer del modal -->
  <div slot="footer" class="button-group">
    <button type="button" (click)="closeModal()" class="btn-secondary">
      Cancelar
    </button>
    <button type="button" class="btn-primary">
      Guardar
    </button>
  </div>
</app-modal>
```

## Propiedades (Inputs)

| Propiedad | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `isOpen` | `boolean` | `false` | Controla si el modal está abierto |
| `title` | `string` | `''` | Título del modal |
| `showCloseButton` | `boolean` | `true` | Muestra/oculta el botón × de cierre |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamaño del modal |
| `closeOnBackdropClick` | `boolean` | `true` | Permite cerrar al hacer click fuera |

## Eventos (Outputs)

| Evento | Descripción |
|--------|-------------|
| `closeModal` | Se emite cuando se debe cerrar el modal |

## Tamaños Disponibles

- **small**: 400px - 500px
- **medium**: 500px - 600px  
- **large**: 700px - 900px

## Clases CSS Disponibles

### Para formularios:
- `.form-field`: Contenedor de campo
- `.form-label`: Etiqueta de campo
- `.form-input`: Input de texto
- `.form-select`: Select dropdown
- `.form-textarea`: Textarea

### Para botones:
- `.btn-primary`: Botón principal (azul)
- `.btn-secondary`: Botón secundario (gris)
- `.btn-crear`: Botón de crear/abrir modal
- `.button-group`: Grupo de botones

## Ejemplo Completo con Formulario

```html
<app-modal 
  [isOpen]="showModal" 
  [title]="'Crear Usuario'"
  [size]="'medium'"
  (closeModal)="closeModal()"
>
  <form [formGroup]="userForm">
    <div class="form-field">
      <label class="form-label">Nombre:</label>
      <input formControlName="name" class="form-input" placeholder="Nombre completo">
    </div>
    
    <div class="form-field">
      <label class="form-label">Email:</label>
      <input formControlName="email" type="email" class="form-input" placeholder="correo@ejemplo.com">
    </div>
    
    <div class="form-field">
      <label class="form-label">Descripción:</label>
      <textarea formControlName="description" class="form-textarea" rows="3" placeholder="Descripción del usuario"></textarea>
    </div>
  </form>
  
  <div slot="footer" class="button-group">
    <button type="button" (click)="closeModal()" class="btn-secondary">
      Cancelar
    </button>
    <button type="button" (click)="saveUser()" [disabled]="!userForm.valid" class="btn-primary">
      Guardar Usuario
    </button>
  </div>
</app-modal>
```

## Migración de Modales Existentes

Para migrar un modal existente, simplemente:

1. Reemplaza el HTML del modal con `<app-modal>`
2. Mueve el contenido del formulario al body del modal
3. Mueve los botones al footer con `slot="footer"`
4. Actualiza las clases CSS según la documentación
5. Elimina el CSS específico del modal (ya no es necesario)

## Características Incluidas

✅ Cierre al hacer click fuera del modal
✅ Botón × de cierre en la esquina superior derecha
✅ Diferentes tamaños responsivos
✅ Estilos consistentes con el diseño de la aplicación
✅ Soporte para contenido personalizable (título, body, footer)
✅ Integración con formularios reactivos
✅ Animaciones y transiciones suaves
