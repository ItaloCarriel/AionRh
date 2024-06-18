import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from '../shared/services/auth-service.service';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.page.html',
  styleUrls: ['./reset-senha.page.scss'],
})
export class ResetSenhaPage {
  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async resetPassword() {
    if (this.resetPasswordForm.valid) {
      const { email } = this.resetPasswordForm.value;
      const loading = await this.loadingCtrl.create({
        message: 'Autenticando...',
      });
      await loading.present();
      try {
        const reset = await this.authService.resetPassword(email);
        console.log(reset);
        await loading.dismiss();

        const alert = await this.alertCtrl.create({
          header: 'Recuperação de senha realizada',
          message:
            'Caso seja um email válido, verifique sua caixa de entrada para redefinir sua senha.',
          buttons: ['OK'],
        });

        await alert.present();

        await this.router.navigate(['/login']);
      } catch (error) {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Por favor, preencha o seu email corretamente.',
          duration: 3000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
      }
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, preencha o seu email corretamente.',
        duration: 3000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
  }
}
