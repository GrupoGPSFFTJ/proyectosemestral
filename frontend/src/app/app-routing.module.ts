import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { authGuard } from '../guards/auth.guard';
import { CustomPreloadingStrategy } from './strategies/custom-preloading.strategy';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule),
    canActivate: [authGuard]
  },
  {
    path: 'familias',
    loadChildren: () => import('./familias/familias.module').then(m => m.FamiliasModule),
    canActivate: [authGuard]
  },
  {
    path: 'citas',
    loadChildren: () => import('./citas/citas.module').then(m => m.CitasModule),
    canActivate: [authGuard]
  },
  {
    path: 'medicamentos',
    loadChildren: () => import('./medicamentos/medicamentos.module').then(m => m.MedicamentosModule),
    canActivate: [authGuard]
  },
  {
    path: 'recetas',
    loadChildren: () => import('./recetas/recetas.module').then(m => m.RecetasModule),
    canActivate: [authGuard]
  },
  {
    path: 'despachos',
    loadChildren: () => import('./despachos/despachos.module').then(m => m.DespachosModule),
    canActivate: [authGuard]
  },
  {
    path: 'fichas-clinica',
    loadChildren: () => import('./fichas-clinica/fichas-clinica.module').then(m => m.FichasClinicaModule),
    canActivate: [authGuard]
  },
  {
    path: 'fichas-odontologica',
    loadChildren: () => import('./fichas-odontologica/fichas-odontologica.module').then(m => m.FichasOdontologicaModule),
    canActivate: [authGuard]
  },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // ✅ LAZY LOADING: Estrategia de preloading personalizada
    preloadingStrategy: CustomPreloadingStrategy,
    // Habilitar trazado para debug (opcional)
    enableTracing: false
  })],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule { }
