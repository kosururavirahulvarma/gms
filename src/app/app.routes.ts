import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/main/home/home.component';
import { authGuard } from './guards/auth/auth.guard';
import path from 'path';
import { OpportunityFinderComponent } from './components/main/home/opportunity-finder/opportunity-finder.component';
import { RemindersComponent } from './components/main/home/reminders/reminders.component';
import { FavoritesComponent } from './components/main/home/favorites/favorites.component';
import { DashboardComponent } from './components/main/home/dashboard/dashboard.component';
import { ViewOpportunityComponent } from './components/main/home/view-opportunity/view-opportunity.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component:DashboardComponent,
        canActivate:[authGuard],
      },
      {
        path: 'opportunity',
        component: OpportunityFinderComponent,
        canActivate: [authGuard],
      },
      {
        path: 'opportunity/:opportunity_number',
        component: ViewOpportunityComponent,
        canActivate: [authGuard],
      },
      {
        path: 'reminder',
        component: RemindersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'favorites/:favorite_opportunity_number',
        component: ViewOpportunityComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
