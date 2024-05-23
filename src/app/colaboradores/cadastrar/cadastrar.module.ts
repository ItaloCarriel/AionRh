import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPageRoutingModule } from './cadastrar-routing.module';

import { CadastrarPage } from './cadastrar.page';
import { HeaderComponent } from 'src/app/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
    IonicModule,
    CadastrarPageRoutingModule
  ],
  declarations: [CadastrarPage]
})
export class CadastrarPageModule {}
