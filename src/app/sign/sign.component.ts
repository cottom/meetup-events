import { Component, OnInit} from '@angular/core';
import { ValidationService} from '../shared';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr.ts';
import { AuthService, ProgressBarService } from '../shared';

@Component({
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  signUpForm: FormGroup;
  signInForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastsManager,
    private authService: AuthService,
    private router: Router,
    private progressBarService: ProgressBarService) {}

  get signUpErrorMessages(): Object{
     return this.getErrorMessage(this.signUpForm);
  }

  get signInErrorMessages(): Object{
    return this.getErrorMessage(this.signInForm);
  }

  getErrorMessage(form: FormGroup) {
      let _errorMessage = {};
    for (let key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        let control = form.controls[key];
        for (let errorCode in control.errors) {
          if (control.errors.hasOwnProperty(errorCode) && control.touched) {
              _errorMessage[key] = ValidationService.getValidatorErrorMessage(errorCode, control.errors[errorCode]);
          }
        }
      }
    }

    return _errorMessage;
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required]]
    });

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: ValidationService.matchingPasswords('password', 'confirmPassword')
    });
  }

  signUpSubmit() {
    this.progressBarService.loadding();
    this.authService.signUp(
      this.signUpForm.controls['email'].value,
      this.signUpForm.controls['password'].value)
      .then((data) => {
        this.progressBarService.componentLoading();
        console.log(data);
        firebase.auth().currentUser.sendEmailVerification().then(() => {
          this.toastr.success('Email Verification Sented!', 'success');
        }, () => {
          this.toastr.error('Email Verification Sent fail!', 'fail');
        });
      }).catch((error) => {
        this.progressBarService.componentLoading();
        this.toastr.error(error['message'], 'error');
      });
  }

  signInSubmit() {
    this.progressBarService.loadding();
    this.authService.signIn(
      this.signInForm.controls['email'].value,
      this.signInForm.controls['password'].value)
       .then((date) => {
         this.progressBarService.componentLoading();
          if (!date.emailVerified) {
              this.toastr.warning('Please validator you email', 'fail');
              return;
          }
          this.authService.user = firebase.auth().currentUser;
          this.toastr.success('Success login', 'success');
          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
          }else {
            this.router.navigate(['/meetup']);
          }
       })
       .catch((error) => {
         this.progressBarService.componentLoading();
         if (error['code'] === 'auth/wrong-password') {
           this.toastr.error('Wrong password or email', 'fail');
         }else {
           this.toastr.error(error['message'], 'error');
         }
       });
  }
};
