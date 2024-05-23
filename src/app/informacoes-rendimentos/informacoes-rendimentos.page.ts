import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

export interface Avaliacao {
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
  selector: 'app-informacoes-rendimentos',
  templateUrl: './informacoes-rendimentos.page.html',
  styleUrls: ['./informacoes-rendimentos.page.scss'],
})
export class InformacoesRendimentosPage implements OnInit {
  pageTitle: string = 'Registro de Avaliações';
  avaliacoes: Avaliacao[] = [];

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.carregarAvaliacoes();
  }

  carregarAvaliacoes() {
    this.firestore.collection<Avaliacao>('avaliacaoAtividades').valueChanges().subscribe((avaliacoes) => {
      this.avaliacoes = avaliacoes;
      this.ordenarAvaliacoesPorPontuacao();
    });
  }

  ordenarAvaliacoesPorPontuacao() {
    this.avaliacoes.sort((a, b) => b.pontuacao - a.pontuacao);
  }

  editarAvaliacao(avaliacao: Avaliacao) {
    this.router.navigate(['/editar-avaliacao', avaliacao.id]);
  }

  async openPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    popover.onDidDismiss().then((data) => {
      if (data && data.data) {
        this.generateReport(data.data);
      }
    });
    return await popover.present();
  }

  generateReport(type: string) {
    let reportContent = '';

    if (type === 'pontuacao') {
      reportContent = this.generatePontuacaoReport();
    } else if (type === 'categorias') {
      reportContent = this.generateCategoriasReport();
    }

    this.printReport(reportContent);
  }
  generatePontuacaoReport(): string {
    let reportContent = `
      <style>
      body {
        font-family: 'Lexend', "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 12px;
      }
      @page {
        size: A4;
        margin: 3cm 2cm 2cm 3cm;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'Lexend', "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 12px;
      }
      th, td {
        border: 1px solid #dddddd;
        text-align: left;
  
      }
      th {
        background-color: #f2f2f2;
      }
      .header {
        text-align: center;
        font-size: 12px;
        font-weight: bold;
      }
      h1 {
        font-size: 12px;
      }
      .introduction {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
      }
      </style>
      <div class="header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXRe7PKFUR5gv7q6Bqq2RNyw1lyyCE7DbaaoQRd6I5w&s" alt="Brasão" style="width: 70px; height: auto;">
        <h1>GOVERNO DO ESTADO DE RONDÔNIA</h1>
        <h1>Superintendência Estadual de Compras e Licitações</h1>
        <br>
        <h1>RELATÓRIO DE PONTUAÇÃO</h1>
      </div>
      <div class="introduction">
        <p>
          Prezados Senhores,
        </p>
        <p>
          É com satisfação que apresentamos o Relatório de Pontuação referente ao desempenho dos servidores desta Superintendência. Este relatório visa fornecer uma visão abrangente das pontuações atribuídas aos colaboradores durante o período especificado.
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Colaborador</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>`;

    this.avaliacoes.forEach((avaliacao) => {
      reportContent += `<tr><td>${avaliacao.colaborador}</td><td>${avaliacao.pontuacao}</td></tr>`;
    });

    reportContent += `
      </tbody>
    </table>
    <div class="footer">
      <p>
        Supel - Superintendência Estadual de Licitações<br>
        Localizado em: Palácio Rio Madeira<br>
        Endereço: Edifício Rio Pacaás Novos, Av. Farquar, 2986 - Pedrinhas, Porto Velho - RO, 76801-470<br>
        Telefone: (69) 3216-5318<br>
        Página: <span class="pageNumber"></span><br>
        Data e hora de impressão: <span class="printDateTime"></span>
      </p>
    </div>`;
    return reportContent;
  }

  generateCategoriasReport(): string {
    let reportContent = `
    <style>
    body {
      font-family: 'Lexend', "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 12px;
    }
    @page {
      size: A4;
      margin: 3cm 2cm 2cm 3cm;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Lexend', "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 12px;
    }
    th, td {
      border: 1px solid #dddddd;
      text-align: left;

    }
    th {
      background-color: #f2f2f2;
    }
    .header {
      text-align: center;
      font-size: 12px;
      font-weight: bold;
    }
    h1 {
      font-size: 12px;
    }
    .introduction {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
    }
    </style>
    <div class="header">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXRe7PKFUR5gv7q6Bqq2RNyw1lyyCE7DbaaoQRd6I5w&s" alt="Brasão" style="width: 70px; height: auto;">
      <h1>GOVERNO DO ESTADO DE RONDÔNIA</h1>
      <h1>Superintendência Estadual de Compras e Licitações</h1>
      <br>
      <h1>RELATÓRIO DE PONTUAÇÃO</h1>
    </div>
    <div class="introduction">
      <p>
        Prezados Senhores,
      </p>
      <p>
        É com satisfação que apresentamos o Relatório de Pontuação referente ao desempenho dos servidores desta Superintendência. Este relatório visa fornecer uma visão abrangente das pontuações atribuídas aos colaboradores durante o período especificado.
      </p>
    </div>
    <table>
<thead><tr><th>Categoria</th><th>Colaborador</th>
<th>Pontuação</th>
</tr>       </thead>
<tbody>

`;


    this.avaliacoes.forEach((avaliacao) => {
      reportContent += `<tr><td>${avaliacao.categoria}</td><td>${avaliacao.colaborador}</td><td>${avaliacao.pontuacao}</td></tr>`;
    });
    reportContent += `
      </tbody>
    </table>
    <div class="footer">
      <p>
        Supel - Superintendência Estadual de Licitações<br>
        Localizado em: Palácio Rio Madeira<br>
        Endereço: Edifício Rio Pacaás Novos, Av. Farquar, 2986 - Pedrinhas, Porto Velho - RO, 76801-470<br>
        Telefone: (69) 3216-5318<br>
        Página: <span class="pageNumber"></span><br>
        Data e hora de impressão: <span class="printDateTime"></span>
      </p>
    </div>`;
    return reportContent;
  }

  printReport(reportContent: string) {
    const newWindow = window.open('', '_blank', 'width=800, height=600');
    if (newWindow) {
      newWindow.document.write(reportContent);
      newWindow.document.close();
      newWindow.print();
    } else {
      console.error('Failed to open new window for printing');
    }
  }

  getCategoriaClass(categoria: string): string {
    switch (categoria) {
      case 'Inovação':
        return 'categoria-inovacao';
      case 'Colaboração':
        return 'categoria-colaboracao';
      case 'Liderança':
        return 'categoria-lideranca';
      case 'Desenvolvimento':
        return 'categoria-desenvolvimento';
      case 'Desenvolvimento Pessoal':
        return 'categoria-desenvolvimento-pessoal';
      default:
        return '';
    }
  }
}
