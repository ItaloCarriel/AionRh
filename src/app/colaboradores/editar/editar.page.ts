import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

interface Colaborador {
  matricula: string;
  nomeCompleto: string;
  setor: string;
  cargo: string;
  dataAdmissao: string;
  email: string;
  telefone: string;
  situacao: string;
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  pageTitle: string = 'Editar Cadastro';
  phone: string = '';
  colaboradorForm: FormGroup;
  colaboradorId: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private alertController: AlertController
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
    this.colaboradorId = this.route.snapshot.paramMap.get('id')!;
    this.loadColaboradorData();
  }

  loadColaboradorData() {
    debugger
    this.firestore.doc<Colaborador>(`colaboradores/${this.colaboradorId}`).valueChanges().subscribe(data => {
      if (data) {
        const ColaboradorData = {
          ...data,
          setor: data.setor.trim()
        }
        this.phone = ColaboradorData.telefone

        this.colaboradorForm.patchValue(ColaboradorData);
      }
    });
  }

  async update() {
    if (this.colaboradorForm.valid) {
      try {
        await this.firestore.doc(`colaboradores/${this.colaboradorId}`).update(this.colaboradorForm.value);
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Colaborador atualizado com sucesso!',
          buttons: ['OK']
        });
        await alert.present();
        this.location.back();
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos obrigatórios.',
        buttons: ['OK']
      });
      await alert.present();
    }
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

  async discardChanges() {
    /*  await this.loadColaboradorData(); // Recarrega os dados originais */
    this.location.back();
  }
}
