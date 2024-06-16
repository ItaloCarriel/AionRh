import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Colaborador } from '../cadastro/cadastro.page';
import { Location } from '@angular/common';

interface Avaliacao {
  id: string;
  categoria: string;
  previstoPAC: string;
  cargaHoraria: string;
  pontuacao: number;
  dataAtividade: string;
  colaborador: string;
}

@Component({
  selector: 'app-editar-rendimento',
  templateUrl: './editar-rentimento.page.html',
  styleUrls: ['./editar-rendimento.component.scss'],
})
export class EditarRendimentoComponent implements OnInit {
  pageTitle: string = 'Editar Rendimento';
  avaliacaoForm: FormGroup;
  avaliacaoId: string = '';
  colaboradores: Colaborador[] = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private location: Location
  ) {
    this.avaliacaoForm = this.formBuilder.group({
      setor: ['', Validators.required],
      categoria: ['', Validators.required],
      previstoPAC: ['', Validators.required],
      cargaHoraria: ['', Validators.required],
      pontuacao: ['', [Validators.required, Validators.min(0)]],
      dataAtividade: ['', Validators.required],
      colaborador: ['', Validators.required],
      avaliacao: [''],
      nota: [''],
    });
  }

  ngOnInit() {
    this.avaliacaoId = this.route.snapshot.paramMap.get('id')!;
    this.loadAvaliacaoData();
    this.loadColaboradores();
  }

  loadAvaliacaoData() {
    this.firestore.doc<Avaliacao[]>(`avaliacaoAtividades/${this.avaliacaoId}`).valueChanges().subscribe(data => {
      if (data) {
        this.avaliacaoForm.patchValue(data);
      }
    });
  }
  async discardForm() {
    this.location.back()
  }

  loadColaboradores() {
    this.firestore.collection<Colaborador>('colaboradores').valueChanges().subscribe(data => {
      this.colaboradores = data;
    });
  }

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

      this.firestore.collection<Colaborador>('colaboradores', ref => ref.where('nomeCompleto', '==', colaboradorNomeCompleto))
        .valueChanges()
        .subscribe(colaboradores => {
          if (colaboradores.length > 0) {
            const colaboradorSelecionado = colaboradores[0];
            console.log('Colaborador encontrado:', colaboradorSelecionado);
            this.avaliacaoForm.patchValue({
              setor: colaboradorSelecionado.setor
            });
          } else {
            console.log('Nenhum colaborador encontrado com o nome:', colaboradorNomeCompleto);
          }
        });
    }
  }

  async update() {
    await this.avaliacaoForm.markAllAsTouched();
    if (this.avaliacaoForm.valid) {
      try {
        /* await this.firestore.doc(`avaliacaoAtividades/${this.avaliacaoId}`).update(this.avaliacaoForm.value); */
        console.log(this.avaliacaoForm.value)
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Rendimento atualizado com sucesso!',
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
    this.loadAvaliacaoData(); // Recarrega os dados originais
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
