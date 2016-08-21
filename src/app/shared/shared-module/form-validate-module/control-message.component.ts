import { Component, Input } from '@angular/core';
import {  FormControl } from '@angular/forms';
import { ValidationService } from './form-validate.service';

@Component({
  selector: 'control-message',
  template: `<div *ngIf="control.invalid&&control.touched" class="error-tip">{{errorMessage}}</div>`
})
export  class ControlMessageComponent  {
  @Input() control: FormControl;
  constructor() {}
  get errorMessage(){
    for (let key in this.control.errors) {
      if (this.control.errors.hasOwnProperty(key) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(key, this.control.errors[key]);
      }
    }
    return null;
  }
};

