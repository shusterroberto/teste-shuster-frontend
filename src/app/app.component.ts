import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { HistoricoComponent } from './historico/historico.component';
import { BuscarComponent } from './buscar/buscar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTabsModule, 
    BuscarComponent, 
    HistoricoComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
