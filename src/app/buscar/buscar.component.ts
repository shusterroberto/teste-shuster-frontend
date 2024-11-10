import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent {
  usuario: string = '';
  filme: string = '';
  resultado: any = null;
  erroCarregamento: boolean = false;
  carregando: boolean = false; 

  buscarFilme() {
    this.carregando = true;
    this.resultado = null;
    this.erroCarregamento = false;

    const url = `http://127.0.0.1:8000/movies?user=${this.usuario}&title=${encodeURIComponent(this.filme)}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta do servidor');
        }
        return response.json();
      })
      .then(data => {
        this.resultado = data[0];
        this.carregando = false;
      })
      .catch(error => {
        console.error('Erro na busca:', error);
        this.erroCarregamento = true;
        this.carregando = false;
      });
  }
}
