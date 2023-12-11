import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: import.meta.env['NG_APP_PROJECT_ID'],
          appId: import.meta.env['NG_APP_APP_ID'],
          databaseURL: import.meta.env['NG_APP_DATABASE_URL'],
          storageBucket: import.meta.env['NG_APP_STORAGE_BUCKET'],
          apiKey: import.meta.env['NG_APP_API_KEY'],
          authDomain: import.meta.env['NG_APP_AUTH_DOMAIN'],
          messagingSenderId: import.meta.env['NG_APP_MESSAGING_SENDER'],
          measurementId: import.meta.env['NG_APP_MEASUREMENT_ID'],
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
