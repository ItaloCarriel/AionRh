import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColaboradoresPage } from './colaboradores.page';

const routes: Routes = [
  {
    path: '',
    component: ColaboradoresPage
  },
  {
    path: 'cadastrar-colaborador',
    loadChildren: () => import('./cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'importar-planilha',
    loadChildren: () => import('./importar-planilha/importar-planilha.module').then( m => m.ImportarPlanilhaPageModule)
  },
  {
    path: 'editar-colaborador/:id',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  },


  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColaboradoresPageRoutingModule {}
