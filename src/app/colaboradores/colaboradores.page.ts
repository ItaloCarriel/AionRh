import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { ImportarPlanilhaPage } from './importar-planilha/importar-planilha.page';
import { Router } from '@angular/router';

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
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.page.html',
  styleUrls: ['./colaboradores.page.scss'],
})
export class ColaboradoresPage implements OnInit {
  colaboradores: Colaborador[]=[];
  pageTitle: string = 'Colaboradores'


  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    this.carregarDadosColaborador();
  }
  carregarDadosColaborador(){
    this.firestore.collection<Colaborador>('colaboradores').snapshotChanges().subscribe((snapshot) => {
      this.colaboradores = snapshot.map(a => {
        const data = a.payload.doc.data() as Colaborador;
        const id = a.payload.doc.id;
        const { id: dataId, ...rest } = data;
        return { id, ...rest };
      });
    }); 
  }


  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.cadastroColaboradorPlanilha(file);
  }

  openFilePicker() {
    document.getElementById('fileInput')?.click();
  }

  async cadastroColaboradorPlanilha(file: File) {
    const modal = await this.modalController.create({
      component: ImportarPlanilhaPage,
      componentProps: {
        file: file,
      },
    });
    await modal.present();
  }
  openEditar(colaborador: Colaborador) {
    this.router.navigate(['/editar-colaborador', colaborador.id]);

  }
  getIconColor(situacao: string): string {
    switch (situacao) {
      case 'Ativo':
        return 'success'; // green
      case 'Transferido':
        return 'tertiary'; // purple
      case 'Exonerado':
        return 'danger'; // red
      default:
        return '';
    }
  }
  
}
