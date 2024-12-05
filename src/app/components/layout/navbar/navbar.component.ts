import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HomeNavList, NavigationHistory } from '../../../model/HomeNavList';
import { Router, RouterLink, NavigationEnd} from '@angular/router';
import { NavigationserviceService } from '../../../services/navigation/navigationservice.service';
import { TitleCasePipe } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    TitleCasePipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  navigationHistory: NavigationHistory = {
    routeHistory: [],
  };
  constructor(
    private router: Router,
    private navigationserviceService: NavigationserviceService
  ) {}
  navListItems: HomeNavList[] = [
    {
      label: 'Opportunity Finder',
      route: 'home/opportunity',
    },
    {
      label: 'Favorites',
      route: 'home/favorites',
    },
    {
      label: 'Reminders',
      route: 'home/reminder',
    },
  ];
  
  headingBar = [
    {
      label: 'Opportunity Finder Home',
      route: 'opportunity',
    },
    {
      label: 'Favorites',
      route: 'favorites',
    },
    {
      label: 'Reminders',
      route: 'reminder',
    },
    {
      label: 'Opportunity Name',
      route: 'view_opportunity',
    }
  ];
  isOpportunityId: Boolean = true;
  currentRoute: string = '';
  showDrop: boolean = false;


  ngOnInit(): void {
    // Listen for route change events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Only handle NavigationEnd events
    ).subscribe(() => {
      this.handleRouteChange();
    });

    // Initial history subscription
    this.navigationserviceService.history$.subscribe((history) => {
      console.log(history);
      this.navigationHistory = history;
      console.log('history component');
      console.log(history);
      this.handleRouteChange(); // Handle the initial route
    });
  }

  handleRouteChange() {
    const lastRoute = this.navigationHistory?.routeHistory?.[this.navigationHistory.routeHistory.length - 1]?.routeName;

    if (
      lastRoute === 'opportunity' ||
      lastRoute === 'favorites' ||
      lastRoute === 'reminder'
    ) {
      this.isOpportunityId = false;
    } else {
      this.isOpportunityId = true;
    }
  }

  showDropIcon() {
    this.showDrop = true;
    console.log(this.showDrop);
  }

  navitageTo(router: string) {
    this.router.navigate([router]);
  }
}
