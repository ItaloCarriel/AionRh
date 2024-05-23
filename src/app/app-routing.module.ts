import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './servicos/auth-guard.service';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'colaboradores',
    loadChildren: () => import('./colaboradores/colaboradores.module').then(m => m.ColaboradoresPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'departamentos',
    loadChildren: () => import('./departamentos/departamentos.module').then(m => m.DepartamentosPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'informacoes-rendimentos',
    loadChildren: () => import('./informacoes-rendimentos/informacoes-rendimentos.module').then(m => m.InformacoesRendimentosPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'cadastrar-colaborador',
    loadChildren: () => import('./colaboradores/cadastrar/cadastrar.module').then(m => m.CadastrarPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'editar-colaborador/:id',
    loadChildren: () => import('./colaboradores/editar/editar.module').then(m => m.EditarPageModule),
    canActivate: [AuthGuardService]
    },
  {
    path: 'criar-avaliacao',
    loadChildren: () => import('./informacoes-rendimentos/cadastro/cadastro.module').then(m => m.CadastroPageModule),
    canActivate: [AuthGuardService]
   },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
