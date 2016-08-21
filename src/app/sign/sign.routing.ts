import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  SignComponent
} from './sign.component';

import { SignGuard } from './sign-guard.service';
const routes: Routes = [{
  path: 'sign',
  component: SignComponent,
  canActivate: [ SignGuard ]
}];

export const routing = RouterModule.forChild(routes);
