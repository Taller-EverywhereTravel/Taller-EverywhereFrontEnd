import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptos/jwt.interceptor';
import { cacheInterceptor } from './core/interceptos/cache.interceptor';
import { mockHttpInterceptor } from './core/interceptos/mock-http.interceptor';

import { LucideAngularModule, RefreshCcw, CircleUserRound  } from 'lucide-angular';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockHttpInterceptor, jwtInterceptor, cacheInterceptor])),
    importProvidersFrom(LucideAngularModule.pick({
        RefreshCcw,
        CircleUserRound
    }))
  ]
};
