import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
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
export class AppComponent {
  @ViewChild('historico') historicoComponent!: HistoricoComponent;

  ngAfterViewInit() {}

  onTabChange(event: MatTabChangeEvent) {
    console.log('event.index', event.index);
    if (event.index === 1) {
      this.historicoComponent.carregarHistorico();
      console.log('Pagina de historico recarregada');
    }
  }
}
