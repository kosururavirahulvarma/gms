import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HomeNavList, NavigationHistory } from '../../../model/HomeNavList';
import { Router, RouterLink } from '@angular/router';
import { NavigationserviceService } from '../../../services/navigation/navigationservice.service';
import { TitleCasePipe } from '@angular/common';

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
      label: 'Remainders',
      route: 'home/reminder',
    },
  ];

  currentRoute: string = '';
  showDrop: boolean = false;

  ngOnInit(): void {
    this.navigationserviceService.history$.subscribe((history) => {
      console.log(history);
      // this.history = history;
      this.navigationHistory = history;
      console.log('history component');
      console.log(history);
    });
  }

  showDropIcon() {
    this.showDrop = true;
    console.log(this.showDrop);
  }

  navitageTo(router: string) {
    this.router.navigate([router]);
  }
}
