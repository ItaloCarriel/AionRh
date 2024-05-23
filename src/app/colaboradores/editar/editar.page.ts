import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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
  colaboradorForm: FormGroup;
  colaboradorId: string = '';

  constructor(
    private route: ActivatedRoute,
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
    this.firestore.doc<Colaborador>(`colaboradores/${this.colaboradorId}`).valueChanges().subscribe(data => {
      if (data) {
        this.colaboradorForm.patchValue(data);
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

  discardChanges() {
    this.loadColaboradorData(); // Recarrega os dados originais
  }
}
