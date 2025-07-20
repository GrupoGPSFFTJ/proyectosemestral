import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { CustomPreloadingStrategy } from './strategies/custom-preloading.strategy';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pages/pacientes/pacientes.module').then(m => m.PacientesModule),
    canActivate: [authGuard]
  },
  {
    path: 'familias',
    loadChildren: () => import('./pages/familias/familias.module').then(m => m.FamiliasModule),
    canActivate: [authGuard]
  },
  {
    path: 'citas',
    loadChildren: () => import('./pages/citas/citas.module').then(m => m.CitasModule),
    canActivate: [authGuard]
  },
  {
    path: 'medicamentos',
    loadChildren: () => import('./pages/medicamentos/medicamentos.module').then(m => m.MedicamentosModule),
    canActivate: [authGuard]
  },
  {
    path: 'recetas',
    loadChildren: () => import('./pages/recetas/recetas.module').then(m => m.RecetasModule),
    canActivate: [authGuard]
  },
  {
    path: 'despachos',
    loadChildren: () => import('./pages/despachos/despachos.module').then(m => m.DespachosModule),
    canActivate: [authGuard]
  },
  {
    path: 'fichas-clinica',
    loadChildren: () => import('./pages/fichas-clinica/fichas-clinica.module').then(m => m.FichasClinicaModule),
    canActivate: [authGuard]
  },
  {
    path: 'fichas-odontologica',
    loadChildren: () => import('./pages/fichas-odontologica/fichas-odontologica.module').then(m => m.FichasOdontologicaModule),
    canActivate: [authGuard]
  },
  { path: 'pacam', loadChildren: () => import('./pages/pacam/pacam.module').then(m => m.PacamModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadingStrategy,
    enableTracing: false
  })],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule { }
