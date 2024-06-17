import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditarRendimentoComponent } from './informacoes-rendimentos/editar-rendimento/editar-rendimento.component';
import { authGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [authGuard]
  },
  {
    path: 'colaboradores',
    loadChildren: () => import('./colaboradores/colaboradores.module').then(m => m.ColaboradoresPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'departamentos',
    loadChildren: () => import('./departamentos/departamentos.module').then(m => m.DepartamentosPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'informacoes-rendimentos',
    loadChildren: () => import('./informacoes-rendimentos/informacoes-rendimentos.module').then(m => m.InformacoesRendimentosPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'cadastrar-colaborador',
    loadChildren: () => import('./colaboradores/cadastrar/cadastrar.module').then(m => m.CadastrarPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'editar-colaborador/:id',
    loadChildren: () => import('./colaboradores/editar/editar.module').then(m => m.EditarPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'criar-avaliacao',
    loadChildren: () => import('./informacoes-rendimentos/cadastro/cadastro.module').then(m => m.CadastroPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'editar-rendimento',
    component: EditarRendimentoComponent,
    canActivate: [authGuard]
    // loadChildren: () => import('./informacoes-rendimentos/editar-rendimento/editar-rendimento.component').then(m => m.EditarRendimentoComponent),
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
