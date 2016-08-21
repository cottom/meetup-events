import {
  Component
} from '@angular/core';
import {
  AuthService
} from '../shared-module';

let logo = require('public/img/logo.svg');

@Component({
  selector: 'my-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  logoUrl: string;
  showPan: boolean = false;
  constructor(public authService: AuthService) {
    this.logoUrl = logo;
  }
  toggledDrop() {
    this.showPan = !this.showPan;
  }
}
