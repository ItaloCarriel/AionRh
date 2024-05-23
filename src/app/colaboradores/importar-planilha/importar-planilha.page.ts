import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import * as XLSX from 'xlsx';
import 'firebase/compat/firestore';
import * as firebase from 'firebase/compat/app';
@Component({
  selector: 'app-importar-planilha',
  templateUrl: './importar-planilha.page.html',
  styleUrls: ['./importar-planilha.page.scss'],
})
export class ImportarPlanilhaPage implements OnInit {
  planilhaData: any[] = [];
  registrosCadastrados: number = 0;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private firebasestore: AngularFirestore,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    const file: File = this.navParams.get('file');
    if (file) {
      this.readFile(file);
    }
  }

  async readFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
      const sheetName: string = workbook.SheetNames[0]; 
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      this.planilhaData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(this.planilhaData); 
    };
    reader.readAsBinaryString(file);
  }

  async importarPlanilhaProcessada() {
    if (this.planilhaData.length === 0) {
      await this.mostrarMensagem('Nenhum dado para importar.');
      return;
    }
  
    const loading = await this.loadingController.create({
      message: `Importando dados... Registros cadastrados: ${this.registrosCadastrados}`,
    });
    await loading.present();
  
    try {
      let count = 0;
      for (const item of this.planilhaData) {
            

        await this.firebasestore.collection('colaboradores').add({
          nomeCompleto: item.nomeCompleto || '',
          matricula: item.matricula || '',
          cargo: item.cargo || '',
          setor: item.setor || '',
          email: item.email || '',
          telefone: item.telefone ||'',
          dataAdmissao: item.dataAdmissao || '',
          situacao: item.situacao || ''
      });
      
  
        count++;
        this.registrosCadastrados = count;
        loading.message = `Importando dados... Colaboradores cadastrados: ${this.registrosCadastrados}`; 
      }
  
      await loading.dismiss();
      await this.mostrarMensagem(`Dados importados com sucesso. Total de Colaboradores cadastrados: ${this.registrosCadastrados}`);
    } catch (error) {
      console.error('Erro ao importar os dados:', error);
      await loading.dismiss();
      await this.mostrarMensagem('Erro ao importar os dados.');
    }
  }
  

  async mostrarMensagem(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
