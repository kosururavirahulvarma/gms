import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-opportunity-finder',
  standalone: true,
  imports: [MatCardModule, MatSelectModule, MatInputModule, MatSelect,MatInput,FormsModule],
  templateUrl: './opportunity-finder.component.html',
  styleUrl: './opportunity-finder.component.scss'
})
export class OpportunityFinderComponent {
  selectedTextArea?:string
  selectedRadioOption?: string;
  selectedDropOption?:string;
  selectedTextInput?:string;

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
