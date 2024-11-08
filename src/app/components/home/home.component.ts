import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class HomeComponent {
  userName: string = '';
  movieTitle: string = '';
  movieData: any;

  constructor(private movieService: MovieService) {}

  searchMovie() {
    this.movieService.searchMovie(this.userName, this.movieTitle).subscribe(
      (data) => {
        this.movieData = data;
      },
      (error) => {
        console.error('Erro ao buscar filme:', error);
      }
    );
  }
}
