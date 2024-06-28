import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent   {
  @Input() pageTitle: string = 'AIÓN';

  constructor(private router: Router) { }

 
   goHome(){
    this.router.navigate(['/']);
  }


}
