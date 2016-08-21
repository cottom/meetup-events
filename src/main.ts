import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app';

if (process.env.ENV === 'build') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {});
