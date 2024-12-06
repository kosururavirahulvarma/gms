import { Component } from '@angular/core';
import { OpportunityEs } from '../../../../model/Opportunity.model';
import { grantOpportunities } from '../../../../constants/opportunity/opportunity.constants';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormatDateInWordsPipe } from '../../../../pipes/format-date-in-words.pipe';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-view-opportunity',
  standalone: true,
  imports: [MatIcon, MatIconModule, FormatDateInWordsPipe, MatTabsModule],
  templateUrl: './view-opportunity.component.html',
  styleUrl: './view-opportunity.component.scss',
})
export class ViewOpportunityComponent {
  opportunities: OpportunityEs[] = grantOpportunities;
  opportunityNumber: any;
  data: any;
  constructor(private route: ActivatedRoute,private router :Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.opportunityNumber = params.get('opportunity_number');
    });
    this.opportunities.forEach((element) => {
      if (element._source.opportunity_number === this.opportunityNumber) {
        this.data = element._source;
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    });
  }
  backToResults(){
      
      this.router.navigate(['home/opportunity']);
  }
}
