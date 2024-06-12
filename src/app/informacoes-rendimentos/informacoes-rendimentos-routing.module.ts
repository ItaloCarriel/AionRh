
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformacoesRendimentosPage } from './informacoes-rendimentos.page';
import { EditarRendimentoComponent } from './editar-rendimento/editar-rendimento.component';


const routes: Routes = [
  {
    path: '',
    component: InformacoesRendimentosPage
  },
  {
    path: 'criar-avaliacao',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'editar-rendimento',
    component: EditarRendimentoComponent,
    loadChildren: () => import('./editar-rendimento/editar-rendimento.module').then(m => m.EditarRendimentoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacoesRendimentosPageRoutingModule { }
