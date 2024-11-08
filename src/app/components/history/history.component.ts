import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-history',
  standalone: true,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  imports: [CommonModule, MatTableModule]
})
export class HistoryComponent implements OnInit {
  historyData: any[] = [];
  displayedColumns: string[] = ['userName', 'query', 'timestamp'];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getHistory().subscribe(
      (data) => {
        this.historyData = data;
      },
      (error) => {
        console.error('Erro ao buscar histórico:', error);
      }
    );
  }
}
