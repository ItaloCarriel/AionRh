import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacoesRendimentosPage } from './informacoes-rendimentos.page';

const routes: Routes = [
  {
    path: '',
    component: InformacoesRendimentosPage
  },
  {
    path: 'criar-avaliacao',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacoesRendimentosPageRoutingModule {}
