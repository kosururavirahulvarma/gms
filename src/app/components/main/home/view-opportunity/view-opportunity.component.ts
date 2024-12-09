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
  favoriteOpportunityNumber: any;
  data: any;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.opportunityNumber = params.get('opportunity_number');
      this.favoriteOpportunityNumber = params.get(
        'favorite_opportunity_number'
      );
    });
    this.opportunities.forEach((element) => {
      if (this.opportunityNumber != null) {
        if (element._source.opportunity_number === this.opportunityNumber) {
          this.data = element._source;
        }
      }
      if (this.favoriteOpportunityNumber != null) {
        if (element._source.opportunity_number === this.favoriteOpportunityNumber) {
          this.data = element._source;
        }
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    });
  }
  backToResults() {
    if (this.opportunityNumber != null) {
    this.router.navigate(['home/opportunity']);
    }
    if (this.favoriteOpportunityNumber != null) {
      this.router.navigate(['home/favorites']);
      }
  }
}
