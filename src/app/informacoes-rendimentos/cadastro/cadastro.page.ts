import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController
} from '@ionic/angular';

export interface Colaborador {
  id: string;
  nomeCompleto: string;
  matricula: string;
  cargo: string;
  setor: string;
  email: string;
  telefone: string;
  dataAdmissao: Date;
  situacao: string;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  pageTitle: string = 'Registro de Avaliações';
  colaboradores: Colaborador[] = [];
  avaliacaoForm: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private location: Location,
    private router: Router
  ) {
    this.avaliacaoForm = this.formBuilder.group({
      colaborador: ['', Validators.required],
      setor: ['', Validators.required],
      categoria: ['', Validators.required],
      previstoPAC: ['', Validators.required],
      cargaHoraria: ['', Validators.required],
      pontuacao: ['', Validators.required],
      nota: [''],
      dataAtividade: ['', Validators.required],
      avaliacao: [''],
    });
  }
  ngOnInit() {
    this.firestore
      .collection<Colaborador>('colaboradores')
      .valueChanges()
      .subscribe((data) => {
        this.colaboradores = data.sort((a, b) => {
          // Ordenando por nomeCompleto em ordem alfabética
          if (a.nomeCompleto < b.nomeCompleto) return -1;
          if (a.nomeCompleto > b.nomeCompleto) return 1;
          return 0;
        });
        console.log('Colaboradores carregados:', this.colaboradores);
      });
  }
  // ngOnInit() {
  //   this.firestore
  //     .collection<Colaborador>('colaboradores')
  //     .valueChanges()
  //     .subscribe((data) => {
  //       this.colaboradores = data;
  //       console.log('Colaboradores carregados:', this.colaboradores);
  //     });
  // }

  onCategoriaChange() {
    const categoria = this.avaliacaoForm.get('categoria')?.value;
    const cargaHorariaControl = this.avaliacaoForm.get('cargaHoraria');
    const pontuacaoControl = this.avaliacaoForm.get('pontuacao');
    const notaControl = this.avaliacaoForm.get('nota');

    if (categoria === 'Inovação') {
      cargaHorariaControl?.clearValidators();
      pontuacaoControl?.clearValidators();
      notaControl?.setValidators([Validators.required]);
    } else {
      cargaHorariaControl?.setValidators([Validators.required]);
      pontuacaoControl?.setValidators([Validators.required]);
      notaControl?.clearValidators();
    }

    cargaHorariaControl?.updateValueAndValidity();
    pontuacaoControl?.updateValueAndValidity();
    notaControl?.updateValueAndValidity();
  }

  async onSubmit() {
    console.log('Tentando enviar dados do formulário...');
    await this.avaliacaoForm.markAllAsTouched()
    if (this.avaliacaoForm.valid) {
      console.log('Formulário válido, enviando dados...');
      const formData = this.avaliacaoForm.value;
      console.log(formData);
      try {
        await this.firestore.collection('avaliacaoAtividades').add(formData);

        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Atividade cadastrada com sucesso!',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/informacoes-rendimentos']);
              },
            },
          ],
        });
        await alert.present();
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        const alert = await this.alertController.create({
          header: 'Erro',
          message:
            'Ocorreu um erro ao salvar os dados. Por favor, tente novamente.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      console.log('Formulário inválido, não é possível enviar dados.');
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos obrigatórios.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  calcularPontuacao() {
    console.log('Calculando pontuação...');

    const cargaHorariaControl = this.avaliacaoForm.get('cargaHoraria');
    const previstoPACControl = this.avaliacaoForm.get('previstoPAC');
    const pontuacaoControl = this.avaliacaoForm.get('pontuacao');

    if (cargaHorariaControl && previstoPACControl && pontuacaoControl) {
      const cargaHoraria = cargaHorariaControl.value;
      const previstoPAC = previstoPACControl.value;
      let pontos = 0;

      if (cargaHoraria) {
        const horas = parseFloat(cargaHoraria);
        if (previstoPAC === 'Sim') {
          pontos = Math.floor(horas / 10) * 2; // 2 pontos a cada 10 horas se previstoPAC for 'Sim'
        } else {
          pontos = Math.floor(horas / 10); // 1 ponto a cada 10 horas se previstoPAC for 'Não'
        }
      }

      pontuacaoControl.setValue(pontos.toString()); // Atualiza o valor da pontuação no formulário
    }
  }

  buscarNomeCompleto() {
    const colaboradorControl = this.avaliacaoForm.get('colaborador');
    const setorControl = this.avaliacaoForm.get('setor');
    if (colaboradorControl && setorControl) {
      const colaboradorNomeCompleto = colaboradorControl.value;
      console.log('Colaborador selecionado:', colaboradorNomeCompleto);

      this.firestore
        .collection<Colaborador>('colaboradores', (ref) =>
          ref.where('nomeCompleto', '==', colaboradorNomeCompleto).orderBy('nomeCompleto')
        )
        .valueChanges()
        .subscribe((colaboradores) => {
          if (colaboradores.length > 0) {
            const colaboradorSelecionado = colaboradores[0];
            console.log('Colaborador encontrado:', colaboradorSelecionado);

            this.avaliacaoForm.patchValue({
              setor: colaboradorSelecionado.setor
            });
          } else {
            console.log(
              'Nenhum colaborador encontrado com o nome:',
              colaboradorNomeCompleto
            );
          }
        });
    }
}

  async discardForm() {
    this.location.back();
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Atividade cadastrado com sucesso.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro!',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  verifyField(fieldName: string) {
    const field = this.avaliacaoForm.get(fieldName)!;
    return field.invalid && (field.dirty || field.touched);
  }

  get colaborador() {
    return this.verifyField('colaborador');
  }
  get setor() {
    return this.verifyField('setor');
  }
  get categoria() {
    return this.verifyField('categoria');
  }

  get cargaHoraria() {
    return this.verifyField('cargaHoraria');
  }

  get previstoPAC() {
    return this.verifyField('previstoPAC');
  }

  get pontuacao() {
    return this.verifyField('pontuacao');
  }

  get nota() {
    return this.verifyField('nota');
  }

  get dataAtividade() {
    return this.verifyField('dataAtividade');
  }
}
