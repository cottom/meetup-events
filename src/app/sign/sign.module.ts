import { NgModule } from '@angular/core';


import {routing} from './sign.routing';
import { SharedModule } from '../shared';
import { SignComponent } from './sign.component';
import {SignNavComponent} from './sign-nav';

import { SignGuard } from './sign-guard.service';
@NgModule({
  imports: [
   routing,
   SharedModule
],
  declarations: [
    SignComponent,
    SignNavComponent
  ],
  providers: [SignGuard]
})
export class SignModule {

}
