import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationserviceService {
  private history: any[] = [];
  public history$ = new BehaviorSubject<string[]>([]); // Initially empty

  constructor(private router: Router) {
    // On service initialization, fetch the current URL and initialize the history
    this.initializeHistory();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Extract the path
        const path = event.url;
        console.log('Full URL:', path); // Log full URL
        const pathSegments = path.split('/').filter((segment) => segment); // Split and filter segments
        console.log('Path Segments:', pathSegments); // Log the array of path segments

        // Clear history and update with new path
        this.clearHistory();
        // this.history.push(pathSegments);
        this.history$.next(pathSegments); // Update the history observable
      }
    });
  }

  // Initialize history on page load (especially after refresh)
  private initializeHistory() {
    const currentPath = window.location.pathname; // Get current path
    const pathSegments = currentPath.split('/').filter((segment) => segment); // Split path by '/'
    // this.history.push(pathSegments); // Initialize with current path
    this.history$.next(pathSegments); // Update observable with current path
  }

  // Method to clear history
  clearHistory() {
    this.history = [];
    this.history$.next(this.history);
  }

  // Method to get current history
  getHistory() {
    return this.history$.asObservable();
  }
}
