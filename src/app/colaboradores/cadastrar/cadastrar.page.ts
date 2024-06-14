import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

export interface Colaborador {
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
  phoneRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
  phone: string = '';
  colaboradorForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) {

    this.colaboradorForm = this.formBuilder.group({
      matricula: ['', Validators.required],
      nomeCompleto: ['', Validators.required],
      setor: ['', Validators.required],
      cargo: ['', Validators.required],
      dataAdmissao: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
      situacao: ['', Validators.required]
    });
  }

  onChangePhone(event: any) {

    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    var str = event.target.value.replace(/[^0-9]/g, "").slice(0, 11);;
    const subst = `($1) $2-$3`;

    const result = str.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
    this.phone = result

  }

  verifyField(fieldName: string) {
    const field = this.colaboradorForm.get(fieldName)!
    return (field.invalid && (field.dirty || field.touched))
  }
  get matricula() {
    return this.verifyField('matricula')!;
  }
  get nomeCompleto() {
    return this.verifyField('nomeCompleto')!;
  }
  get setor() {
    return this.verifyField('setor')!;
  }
  get cargo() {
    return this.verifyField('cargo')!;
  }
  get dataAdmissao() {
    return this.verifyField('dataAdmissao')!;
  }
  get email() {
    return this.verifyField('email')!;
  }
  get telefone() {
    return this.verifyField('telefone')!;
  }
  get situacao() {
    return this.verifyField('situacao')!;
  }




  async onSubmit() {
    console.log('Tentando enviar dados do formulário...');
    await this.colaboradorForm.markAllAsTouched()
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
        this.location.back();
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

  async discardForm() {
    this.location.back()
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

  ngOnInit() {
    const itemData = this.route.snapshot.paramMap.get('colaborador');
    if (itemData) {
      this.colaborador = JSON.parse(itemData);
    }

  }

}
