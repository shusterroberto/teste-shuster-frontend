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
  resultado: string | null = null;

  buscarFilme() {
    const url = `http://127.0.0.1:8000/movies?user=${this.usuario}&title=${encodeURIComponent(this.filme)}`;
    
    // Usando fetch para fazer a requisição HTTP
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.text(); // ou `response.json()` se o backend retornar JSON
      })
      .then(data => {
        this.resultado = data;
      })
      .catch(error => {
        console.error('Erro na busca:', error);
      });
  }
}
