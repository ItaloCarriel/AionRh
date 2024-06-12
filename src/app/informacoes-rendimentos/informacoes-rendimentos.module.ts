import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacoesRendimentosPageRoutingModule } from './informacoes-rendimentos-routing.module';

import { InformacoesRendimentosPage } from './informacoes-rendimentos.page';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    InformacoesRendimentosPageRoutingModule
  ],
  declarations: [InformacoesRendimentosPage,]
})
export class InformacoesRendimentosPageModule {}
