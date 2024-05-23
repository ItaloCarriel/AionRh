import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPageRoutingModule } from './editar-routing.module';

import { EditarPage } from './editar.page';
import { HeaderComponent } from 'src/app/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditarPageRoutingModule
  ],
  declarations: [EditarPage]
})
export class EditarPageModule {}
