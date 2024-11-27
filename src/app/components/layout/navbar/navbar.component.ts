import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HomeNavList } from '../../../model/HomeNavList';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}
  navListItems: HomeNavList[] = [
    {
      label: 'Opportunity Finder',
      route: 'opportunity',
    },
    {
      label: 'Favorites',
      route: 'favorites',
    },
    {
      label: 'Remainders',
      route: 'reminder',
    },
  ];


  currentRoute: string = '';
  showDrop: boolean = false;

  ngOnInit(): void {
    this.currentRoute = this.router.url; // Get the current route URL
  }

  showDropIcon() {
    this.showDrop = true;
    console.log(this.showDrop);
  }

  navitageTo(router: string) {
    this.router.navigate(['home/' + router]);
  }
}
