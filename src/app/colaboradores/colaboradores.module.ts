import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColaboradoresPageRoutingModule } from './colaboradores-routing.module';

import { ColaboradoresPage } from './colaboradores.page';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
    IonicModule,
    ColaboradoresPageRoutingModule
  ],
  declarations: [ColaboradoresPage]
})
export class ColaboradoresPageModule {}
