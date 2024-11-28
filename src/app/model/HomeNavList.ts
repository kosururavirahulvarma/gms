export interface HomeNavList {
  label: string;
  route: string;
}

export interface NavigationHistory {
  routeHistory: NavigationModel[];
}

export interface NavigationModel {
  routeName: string;
  path: string;
}
