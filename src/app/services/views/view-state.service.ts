import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { OpportunityData } from '../../model/Opportunity.model';// Adjust the path as per your project structure
import { NavigationserviceService } from '../navigation/navigationservice.service';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ViewStateService {

  constructor(private router: Router) {
    console.log('now')
    // Subscribe to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url;
        this.handleRouteChange(currentRoute);
      });
  }

  private handleRouteChange(route: string): void {
    // Check if the current route matches "opportunity" or "opportunity/:id"
    const isOpportunityRoute = this.isOpportunityRoute(route);

    if (!isOpportunityRoute) {
      this.clearState();
    }
  }

  private isOpportunityRoute(route: string): boolean {
    // Match "opportunity" or "opportunity/:id" using a regex
    return /\bopportunity\b/.test(route);
  }

  private clearState(): void {
    console.log('Clearing BehaviorSubjects');
    this.filterStateSubject.next(null);
    this.dataStateSubject.next([]);
  }
  // BehaviorSubjects to store and observe state
  private filterStateSubject = new BehaviorSubject<any>({});

  private dataStateSubject = new BehaviorSubject<OpportunityData[]>([]);

  // Public observables
  filterState$ = this.filterStateSubject.asObservable();
  dataState$ = this.dataStateSubject.asObservable();

  // Methods to update state
  updateFilterState(filterState:any) {
    console.log('filter service ')
    console.log(filterState)
    this.filterStateSubject.next(filterState);
  }

  updateDataState(data: OpportunityData[]) {
    console.log(data)
    this.dataStateSubject.next(data);
  }

}
