import { NgModule} from '@angular/core';
import { ControlMessageComponent } from './control-message.component';

import { ValidationService } from './form-validate.service';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ControlMessageComponent],
  exports: [ControlMessageComponent],
  providers: [ValidationService]
})
export class FormValidateModule {
}
