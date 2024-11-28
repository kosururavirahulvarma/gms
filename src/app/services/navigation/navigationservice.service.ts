import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavigationHistory, NavigationModel } from '../../model/HomeNavList';

@Injectable({
  providedIn: 'root',
})
export class NavigationserviceService {
  public history$ = new BehaviorSubject<NavigationHistory>({
    routeHistory: [],
  });

  navigationHistory: NavigationHistory = {
    routeHistory: [],
  };

  constructor(private router: Router) {
    this.initializeHistory();
    // On service initialization, subscribe to router events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const path = event.url;
        // Split the path into segments and filter out empty ones
        const pathSegments = path.split('/').filter((segment) => segment);
        // Clear existing routeHistory
        this.clearHistory();
        // Populate routeHistory with new segments
        pathSegments.forEach((segment, index) => {
          this.navigationHistory.routeHistory.push({
            routeName: segment, // Format the segment (e.g., capitalize)
            path: '/' + pathSegments.slice(0, index + 1).join('/'), // Construct the full path up to this segment
          });
        });
        // Emit the updated history
        this.history$.next(this.navigationHistory);
        console.log(this.history$);
      }
    });
  }

  // Initialize history on page load (especially after refresh)
  private initializeHistory(): void {
    const currentPath = window.location.pathname; // Get current path
    const pathSegments = currentPath.split('/').filter((segment) => segment); // Split path by '/'
    // Update route and routeHistory
    this.navigationHistory.routeHistory = pathSegments.map(
      (segment, index) => ({
        routeName: segment, // Format the segment (capitalize, etc.)
        path: '/' + pathSegments.slice(0, index + 1).join('/'), // Construct full path for the segment
      })
    );

    // Emit the updated history
    this.history$.next(this.navigationHistory);
  }

  // Method to clear history
  clearHistory() {
    // Reset the history object to its initial state
    this.navigationHistory = {
      routeHistory: [],
    };

    // Emit the updated empty history
    this.history$.next(this.navigationHistory);
  }
}
