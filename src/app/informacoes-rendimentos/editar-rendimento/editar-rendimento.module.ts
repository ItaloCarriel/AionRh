import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditarRendimentosComponent } from './editar-rendimento.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EditarRendimentosComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditarRendimentosComponent]
})
export class EditarRendimentosModule { }



// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Routes, RouterModule } from '@angular/router';
// import { IonicModule } from '@ionic/angular';
// import { EditarComponent } from './editar-rendimento.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: EditarComponent
//   }
// ];

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//     RouterModule.forChild(routes)
//   ],
//   declarations: [EditarComponent]
// })
// export class EditarAvaliacaoModule { }


// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class EditarAvaliacaoModule { }
