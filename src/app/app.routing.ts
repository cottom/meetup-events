import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'meetup', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes);
