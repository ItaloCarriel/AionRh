import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-datalabels';
import { NONE_TYPE } from '@angular/compiler';
Chart.register(ChartDataLabels);

export interface Avaliacao {
  id: string;
  categoria: string;
  previstoPAC: string;
  cargaHoraria: string;
  setor: string;
  pontuacao: string;
  dataAtividade: string;
  avaliacao: string;
  colaborador: string
  nota:number;
}
@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [
    CommonModule, RouterModule, IonicModule
  ],
  providers: [
  ],
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {
  avaliacao: Avaliacao[] = [];
  @ViewChild('barChartMaiorPontuacao') barChartMaiorPontuacao: any;
  @ViewChild('barChartColaboradoresPontuacao') barChartColaboradoresPontuacao: any;
  @ViewChild('pieChartSetorMediaPontuacao') pieChartSetorMediaPontuacao: any;
  @ViewChild('pieCharColaboradorCategoria') pieCharColaboradorCategoria: any;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.loadChartData();
  }


  loadChartData() {
    this.firestore.collection<Avaliacao>('avaliacaoAtividades').valueChanges().subscribe((data: Avaliacao[]) => {
      // Calcular média de pontuação por setor
      const mediaPontuacaoSetores: { [key: string]: number } = {};
      const contagemSetores: { [key: string]: number } = {};

      data.forEach(avaliacao => {
        if (!mediaPontuacaoSetores[avaliacao.setor]) {
          mediaPontuacaoSetores[avaliacao.setor] = 0;
          contagemSetores[avaliacao.setor] = 0;
        }
        if (avaliacao.categoria === 'Inovação') {
          mediaPontuacaoSetores[avaliacao.setor] += Number(avaliacao.nota);
        } else {
          mediaPontuacaoSetores[avaliacao.setor] += Number(avaliacao.pontuacao);
        }
        contagemSetores[avaliacao.setor]++;
      });

      for (const setor in mediaPontuacaoSetores) {
        mediaPontuacaoSetores[setor] /= contagemSetores[setor];
      }

      const sortedSetores = Object.keys(mediaPontuacaoSetores).sort((a, b) => mediaPontuacaoSetores[b] - mediaPontuacaoSetores[a]);
      const mediaPontuacoes = sortedSetores.map(setor => mediaPontuacaoSetores[setor]);

      // Desenhar os gráficos
      const orderData = data.sort((a, b) => Number(b.pontuacao) - Number(a.pontuacao));
      const setores = orderData.map(avaliacao => avaliacao.setor);
      const pontuacoes = orderData.map(avaliacao => parseFloat(avaliacao.pontuacao));
      const colaboradores = orderData.map(avaliacao => avaliacao.colaborador);
      const categorias = orderData.map(avaliacao => avaliacao.categoria);

      this.drawBarChart(this.barChartMaiorPontuacao.nativeElement, setores, pontuacoes, 'Setor com maior pontuação');
      this.drawBarChart(this.barChartColaboradoresPontuacao.nativeElement, colaboradores, pontuacoes, 'Colaboradores X Quantidade de Pontos');
      this.drawBarChart(this.pieChartSetorMediaPontuacao.nativeElement, sortedSetores, mediaPontuacoes, 'Setor X Média de Pontuação');
      this.drawPieChart(this.pieCharColaboradorCategoria.nativeElement, colaboradores, categorias, 'Colaborador x Categoria');
    });
  }

  drawBarChart(canvas: HTMLCanvasElement, labels: string[], data: number[], title: string) {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  drawPieChart(canvas: HTMLCanvasElement, labels: string[], data: any[], title: string) {
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
    });
  }


}
