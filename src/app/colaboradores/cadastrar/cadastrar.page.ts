import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportarPlanilhaPage } from '../importar-planilha/importar-planilha.page';
import { ActivatedRoute } from '@angular/router';

export interface Colaborador{
  id: string;
  nomeCompleto: string;
  matricula: string
  cargo: string;
  setor: string;
  email: string,
  telefone: string,
  dataAdmissao: Date;
  situacao: string

}
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  colaborador!: Colaborador;
  pageTitle: string = 'Cadastro de Colaborador';
  colaboradorForm: FormGroup; 

  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.colaboradorForm = this.formBuilder.group({
      matricula: ['', Validators.required],
      nomeCompleto: ['', Validators.required],
      setor: ['', Validators.required],
      cargo: ['', Validators.required],
      dataAdmissao: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      situacao: ['', Validators.required]
    });

   }

  ngOnInit() {
    const itemData = this.route.snapshot.paramMap.get('colaborador');
    if (itemData) {
      this.colaborador = JSON.parse(itemData);
    }
  
  }

  async onSubmit() {
    console.log('Tentando enviar dados do formulário...');
    if (this.colaboradorForm.valid) {
      console.log('Formulário válido, enviando dados...');
      const formData = this.colaboradorForm.value;
      try {
        await this.firestore.collection('colaboradores').add(formData);
        console.log('Dados salvos com sucesso!');
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Colaborador cadastrado com sucesso!',
          buttons: ['OK']
        });
        await alert.present();
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Ocorreu um erro ao salvar os dados. Por favor, tente novamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      console.log('Formulário inválido, não é possível enviar dados.');
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos obrigatórios.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Colaborador cadastrado com sucesso.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro!',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
