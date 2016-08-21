

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  isLoggIn: boolean = true;
  redirectUrl: string;
  user: firebase.User;

  constructor(private router: Router) {}
  initUser() {
     this.user = firebase.auth().currentUser;
     console.log(this.user);
  }

  signIn(email: any, password: any) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signUp(email: any, password: any) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  logout() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut().then(() => {
          this.user = null;
          this.router.navigate(['/sign']);
      });
    }
  }
}
