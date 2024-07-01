import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    provideMarkdown(),
   {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true}
    
  ]
};
