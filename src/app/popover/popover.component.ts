import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  standalone:true,
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    PopoverComponent
  ],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent  implements OnInit {
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  selectReport(reportType: string) {
    this.popoverController.dismiss(reportType);
  }

}
