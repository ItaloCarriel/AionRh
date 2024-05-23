import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../servicos/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const loading = await this.loadingCtrl.create({ message: 'Autenticando...' });
      await loading.present();

      try {
        // Autenticar o usuário usando o serviço AuthService
        const success = await this.authService.login(email, password);

        // Finalizar o loading após a autenticação
        await loading.dismiss();

        if (success) {
          // Navegar para a página inicial após o login bem-sucedido
          this.router.navigate(['/home']);
        } else {
          // Exibir mensagem de erro se a autenticação falhar
          await this.showInvalidCredentialsAlert();
        }
      } catch (error) {
        // Finalizar o loading em caso de erro
        await loading.dismiss();

        // Exibir mensagem de erro caso a autenticação falhe
        await this.showInvalidCredentialsAlert();
      }
    } else {
      // Exibir mensagem de erro se o formulário não for válido
      const toast = await this.toastCtrl.create({
        message: 'Por favor, preencha todos os campos corretamente.',
        duration: 3000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
  }

  async showInvalidCredentialsAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Erro de autenticação',
      message: 'Usuário ou senha incorretos.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
