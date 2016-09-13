import { NgModule,  ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import { MaterialModule } from '../angular2-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidateModule } from './form-validate-module';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

import { ProgressBarService } from './progress-bar.service';
import { InitSpinner } from './init-spinner.service';
import {ValidationService} from './form-validate-module';


import { DialogService } from './dialog.service';
@NgModule({
  imports: [],
  declarations: [],
  exports: [MaterialModule, FormsModule, CommonModule, ReactiveFormsModule, FormValidateModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    console.log('SharedModule ---static');
    let firebaseConfig = {
        apiKey: 'AIzaSyDK3ncESz_pntSQ6nc-K9_zb3xyRa4oWXs',
        authDomain: 'meetupevents-30a86.firebaseapp.com',
        databaseURL: 'https://meetupevents-30a86.firebaseio.com',
        storageBucket: 'meetupevents-30a86.appspot.com'
    };
    firebase.initializeApp(firebaseConfig);
    console.log(firebase.auth());
    return {
      ngModule: SharedModule,
      providers: [
        CanDeactivateGuard,
        AuthGuard,
        AuthService,
        ProgressBarService,
        InitSpinner,
        ValidationService,
        DialogService]
    };
  }
}
