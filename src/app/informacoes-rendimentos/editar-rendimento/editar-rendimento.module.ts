import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditarRendimentoComponent } from './editar-rendimento.component';
import { EditarRendimentoRoutingModule } from './editar-rendimento-routing.module';
import { HeaderComponent } from 'src/app/header/header.component';

@NgModule({
    declarations: [EditarRendimentoComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        EditarRendimentoRoutingModule,
        HeaderComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarRendimentoModule { }




