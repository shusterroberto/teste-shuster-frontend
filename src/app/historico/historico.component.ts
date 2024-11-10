import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  historico: any[] = [];
  usuario: string = 'shuster'; // Defina o usuário conforme necessário
  displayedColumns: string[] = ['usuario', 'nomeFilme', 'anoFilme'];

  ngOnInit() {
    this.carregarHistorico();
  }

  carregarHistorico() {
    fetch('http://127.0.0.1:8000/history')
      .then(response => response.json())
      .then(data => {
        this.historico = data;
      })
      .catch(error => console.error('Erro ao carregar histórico:', error));
  }

  extrairAno(timestamp: string): string {
    const date = new Date(timestamp);
    return date.getFullYear().toString();
  }
}
