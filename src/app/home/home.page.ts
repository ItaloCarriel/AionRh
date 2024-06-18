import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

}
