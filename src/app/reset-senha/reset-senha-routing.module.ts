import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetSenhaPage } from './reset-senha.page';

const routes: Routes = [
  {
    path: '',
    component: ResetSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetSenhaPageRoutingModule {}
