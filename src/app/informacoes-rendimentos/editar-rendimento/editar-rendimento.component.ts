import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

interface Avaliacao {
  id: string;
  categoria: string;
  previstoPAC: string;
  cargaHoraria: string;
  pontuacao: number;
  dataAtividade: string;
  avaliacao: string;
  colaborador: string;
}

@Component({
  selector: 'app-editar-rendimentos',
  templateUrl: './editar-rendimento.component.html',
  styleUrls: ['./editar-rendimento.component.scss'],
})
export class EditarRendimentosComponent implements OnInit {
  pageTitle: string = 'Editar Avaliação';
  avaliacaoForm: FormGroup;
  avaliacaoId: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.avaliacaoForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      previstoPAC: ['', Validators.required],
      cargaHoraria: ['', Validators.required],
      pontuacao: ['', [Validators.required, Validators.min(0)]],
      dataAtividade: ['', Validators.required],
      avaliacao: ['', Validators.required],
      colaborador: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.avaliacaoId = this.route.snapshot.paramMap.get('id')!;
    this.loadAvaliacaoData();
  }

  loadAvaliacaoData() {
    this.firestore.doc<Avaliacao>(`avaliacaoAtividades/${this.avaliacaoId}`).valueChanges().subscribe(data => {
      if (data) {
        this.avaliacaoForm.patchValue(data);
      }
    });
  }

  async update() {
    if (this.avaliacaoForm.valid) {
      try {
        await this.firestore.doc(`avaliacaoAtividades/${this.avaliacaoId}`).update(this.avaliacaoForm.value);
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Avaliação atualizada com sucesso!',
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
}



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

// @Component({
//   selector: 'app-editar',
//   templateUrl: './editar-rendimento.component.html',
//   styleUrls: ['./editar-rendimento.component.scss'],
// })
// export class EditarComponent implements OnInit {
//   avaliacaoId: string;
//   avaliacao: any;

//   constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

//   ngOnInit() {
//     this.avaliacaoId = this.route.snapshot.paramMap.get('id');
//     this.firestore.collection('avaliacaoAtividades').doc(this.avaliacaoId).valueChanges().subscribe(avaliacao => {
//       this.avaliacao = avaliacao;
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-editar-rendimento',
//   templateUrl: './editar-rendimento.component.html',
//   styleUrls: ['./editar-rendimento.component.scss'],
// })
// export class EditarRendimentoComponent  implements OnInit {

//   constructor() { }

//   ngOnInit() {}

// }
