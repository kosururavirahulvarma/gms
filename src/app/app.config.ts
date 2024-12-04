import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio'; // Import added

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideToastr(),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideClientHydration(),
    provideNativeDateAdapter(),
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: '#04345C' }, 
    },
  ],
};
