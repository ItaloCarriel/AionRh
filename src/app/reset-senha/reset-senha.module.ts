import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetSenhaPageRoutingModule } from './reset-senha-routing.module';

import { ResetSenhaPage } from './reset-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ResetSenhaPageRoutingModule
  ],
  declarations: [ResetSenhaPage]
})
export class ResetSenhaPageModule {}
