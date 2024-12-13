import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import { ResultsComponent } from '../results/results.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { NavigationserviceService } from '../../../../services/navigation/navigationservice.service';
import { NavigationHistory } from '../../../../model/HomeNavList';

@Component({
  selector: 'app-opportunity-finder',
  standalone: true,
  imports: [RouterOutlet,MatCardModule,MatIconModule,MatButtonModule,MatToolbarModule,ResultsComponent, MatSelectModule, MatInputModule, MatSelect,MatInput,FormsModule],
  templateUrl: './opportunity-finder-horizontal.component.html',
  styleUrl: './opportunity-finder-horizontal.component.scss'
})
export class OpportunityFinderComponent {
  page :string = 'opportunity';
  selectedTextArea?:string
  selectedRadioOption?: string;
  selectedDropOption?:string;
  selectedTextInput?:string;
  constructor(
    private navigationserviceService: NavigationserviceService
  ) {
  }
  navigationHistory: NavigationHistory = {
    routeHistory: [],
  };

  ngOnInit(): void {
    this.navigationserviceService.history$.subscribe((history) => {
      console.log(history);
      // this.history = history;
      this.navigationHistory = history;
      console.log('history component');
      console.log(history);
    });
  }
  getRecommendedOpp(){
    console.log("recommended opportunites called");
    console.log(this.selectedTextArea);
  }
  goSearch(){
    console.log("go search called");
    console.log(this.selectedTextInput);
    console.log(this.selectedDropOption);
    console.log(this.selectedRadioOption);
  }
}
