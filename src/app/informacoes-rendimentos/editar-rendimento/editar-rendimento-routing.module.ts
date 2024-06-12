import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditarRendimentoComponent } from './editar-rendimento.component';
import { HeaderComponent } from 'src/app/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: EditarRendimentoComponent
  },
  {
    path: 'editar-rentimento',
    loadChildren: () => import('./editar-rendimento.module').then( m => m.EditarRendimentoModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  // declarations: [],
  // imports: [
  //   CommonModule,

  // ]
})
export class EditarRendimentoRoutingModule { }
