import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  historico: any[] = [];
  usuario: string = '';
  displayedColumns: string[] = ['usuario', 'nomeFilme', 'anoFilme'];
  erroCarregamento: boolean = true; 

  ngOnInit() {
    this.carregarHistorico();
  }

  carregarHistorico() {
    fetch('http://127.0.0.1:8000/history')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta do servidor');
        }
        return response.json();
      })
      .then(data => {
        this.historico = data;
        this.erroCarregamento = false; // Resetar o erro se o carregamento for bem-sucedido
      })
      .catch(error => {
        console.error('Erro ao carregar histórico:', error);
        this.erroCarregamento = true; // Marcar como erro se falhar
      });
  }

  extrairAno(timestamp: string): string {
    const date = new Date(timestamp);
    return date.getFullYear().toString();
  }

  exportAsPDF() {
    const content = document.getElementById('history-container') as HTMLElement;
  
    if (!content) {
      console.error("Elemento 'history-container' não encontrado!");
      return;
    }
  
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
  
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('pagina-exportada.pdf');
    }).catch(error => {
      console.error("Erro ao capturar o conteúdo:", error);
    });
  }

  generatePDF() {
    const element = document.getElementById('history-container'); // Substitua pelo ID do elemento desejado
  
    if (element) { // Verifica se o elemento não é nulo
      html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
  
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('relatorio.pdf');
      });
    } else {
      console.error("Elemento com o ID 'pdfContent' não foi encontrado.");
    }
  }
}
