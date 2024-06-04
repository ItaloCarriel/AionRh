import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacoesRendimentosPage } from './informacoes-rendimentos.page';
import { EditarRendimentosComponent } from './editar-rendimento/editar-rendimento.component';

const routes: Routes = [
  {
    path: '',
    component: InformacoesRendimentosPage
  },
  {
    path: 'criar-avaliacao',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },{
    path: 'editar-avaliacao/:id',
    loadChildren: () => import('./editar-rendimento/editar-rendimento.component').then(m => m.EditarRendimentosComponent),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacoesRendimentosPageRoutingModule {}
