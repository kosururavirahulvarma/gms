import { Component } from '@angular/core';
import { ResultsComponent } from '../results/results.component';
ResultsComponent
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ResultsComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
page :string = 'favorites';
}
