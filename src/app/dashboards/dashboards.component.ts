import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-datalabels';
import { NONE_TYPE } from '@angular/compiler';
import { Colaborador } from '../colaboradores/colaboradores.page';
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
  colaborador: string;
  nota: number;
}
@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  providers: [],
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];
  colaboradores: Colaborador[] = [];
  totalColaboradores = {};
  @ViewChild('barChartMaiorPontuacao') barChartMaiorPontuacao: any;
  @ViewChild('barChartColaboradoresPontuacao')
  barChartColaboradoresPontuacao: any;
  @ViewChild('pieChartSetorMediaPontuacao') pieChartSetorMediaPontuacao: any;
  @ViewChild('pieCharColaboradorCategoria') pieCharColaboradorCategoria: any;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.carregarDadosColaborador();

    this.loadChartData();
    console.log(this.ordenarSetores());
  }

  carregarDadosColaborador() {
    this.firestore
      .collection<Colaborador>('colaboradores', (ref) => ref.orderBy('setor'))
      .snapshotChanges()
      .subscribe((snapshot) => {
        this.colaboradores = snapshot.map((a) => {
          const data = a.payload.doc.data() as Colaborador;
          const id = a.payload.doc.id;
          return { ...data, id };
        });
      });
  }

  //TODO: Refatorar  como Serviço para aplicar DRY(Don't Repeat Yourself)
  ordenarSetores() {
    const contagemSetores: { [key: string]: number } = {};

    for (const colaborador of this.colaboradores) {
      const setor = colaborador.setor.trim();

      if (contagemSetores.hasOwnProperty(setor)) {
        contagemSetores[setor]++;
      } else {
        contagemSetores[setor] = 1;
      }
    }
    return contagemSetores;
  }

  ordenarColaboradoresPorNotasSomadas(data: Avaliacao[]) {
    // Criar um objeto vazio para armazenar as somas de notas por colaborador
    const somaNotasPorColaborador: { [key: string]: number } = {};

    // Percorrer cada colaborador nos dados
    for (const colaborador of data) {
      const colaboradorNome = colaborador.colaborador;

      // Verificar se o nome do colaborador já está no objeto
      if (somaNotasPorColaborador.hasOwnProperty(colaboradorNome)) {
        // Se o nome já existir, somar as notas novas à soma existente
        somaNotasPorColaborador[colaboradorNome] +=
          colaborador.nota || parseFloat(colaborador.pontuacao);
      } else {
        // Se o nome ainda não existir, adicionar o nome e a soma das notas ao objeto
        somaNotasPorColaborador[colaboradorNome] =
          colaborador.nota || parseFloat(colaborador.pontuacao);
      }
    }

    // Converter o objeto em um array de colaboradores ordenados

    console.log(somaNotasPorColaborador);
    return somaNotasPorColaborador;
  }

  async loadChartData() {
    this.firestore
      .collection<Avaliacao>('avaliacaoAtividades')
      .valueChanges()
      .subscribe(async (data: Avaliacao[]) => {
        // Calcular média de pontuação por setor
        const mediaPontuacaoSetores: { [key: string]: number } = {};
        const colaboradoresPorSetores = await this.ordenarSetores();
        const totalPontuacao: { [key: string]: number } = {};

        data.forEach((avaliacao) => {
          const setor = avaliacao.setor.trim();
          if (!totalPontuacao[setor]) {
            totalPontuacao[setor] = 0;
          }
          if (avaliacao.categoria === 'Inovação') {
            totalPontuacao[setor] += Number(avaliacao.nota);
          } else {
            totalPontuacao[setor] += Number(avaliacao.pontuacao);
          }
        });

        for (const setor in totalPontuacao) {
          mediaPontuacaoSetores[setor] =
            totalPontuacao[setor] / colaboradoresPorSetores[setor];
        }

        const colaboradoresPorPontuacao =
          await this.ordenarColaboradoresPorNotasSomadas(data);

        const sortedColaboradores = Object.keys(colaboradoresPorPontuacao).sort(
          (a, b) => colaboradoresPorPontuacao[b] - colaboradoresPorPontuacao[a]
        );

        const maioresPontuacoes = sortedColaboradores.map((colaborador) =>
          Number(colaboradoresPorPontuacao[colaborador])
        );

        const sortedSetores = Object.keys(mediaPontuacaoSetores).sort(
          (a, b) => mediaPontuacaoSetores[b] - mediaPontuacaoSetores[a]
        );
        const mediaPontuacoes = sortedSetores.map((setor) =>
          Number(mediaPontuacaoSetores[setor].toFixed(2))
        );
        const totalPontuacoes = sortedSetores.map((setor) =>
          Number(totalPontuacao[setor])
        );

        const orderData = data.sort(
          (a, b) => Number(b.pontuacao) - Number(a.pontuacao)
        );
        const setores = orderData.map((avaliacao) => avaliacao.setor);
        const pontuacoes = orderData
          .map((avaliacao) => parseFloat(avaliacao.pontuacao) || avaliacao.nota)
          .sort((a, b) => b - a);
        const colaboradores = orderData.map(
          (avaliacao) => avaliacao.colaborador
        );
        const categorias = orderData.map((avaliacao) => avaliacao.categoria);

        this.drawBarChart(
          this.barChartMaiorPontuacao.nativeElement,
          sortedSetores,
          totalPontuacoes,
          'Setor com maior pontuação'
        );
        this.drawBarChart(
          this.barChartColaboradoresPontuacao.nativeElement,
          sortedColaboradores,
          maioresPontuacoes,
          'Desempenho Geral'
        );
        this.drawBarChart(
          this.pieChartSetorMediaPontuacao.nativeElement,
          sortedSetores,
          mediaPontuacoes,
          'Setor X Média de Pontuação'
        );
        this.drawPieChart(
          this.pieCharColaboradorCategoria.nativeElement,
          colaboradores,
          categorias,
          'Colaborador x Categoria'
        );
      });
  }

  drawBarChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[],
    title: string
  ) {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  drawPieChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: any[],
    title: string
  ) {
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
