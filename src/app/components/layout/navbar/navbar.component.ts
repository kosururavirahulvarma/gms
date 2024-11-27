import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  navListItems: string[] = ['Opportunity Finder', 'Favorites', 'Remainders'];

  showDrop: boolean = false;
  showDropIcon() {
    this.showDrop = true;
    console.log(this.showDrop);
  }
}
