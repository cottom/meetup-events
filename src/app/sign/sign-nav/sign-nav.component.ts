import { Component } from '@angular/core';
let logo = require('public/img/logo.svg');

@Component({
  selector: 'my-sign-nav',
  templateUrl: './sign-nav.component.html',
  styleUrls: ['./sign-nav.component.scss']
})

export class SignNavComponent {
    logoUrl: string;
  constructor() {
    this.logoUrl = logo;
  }
}
