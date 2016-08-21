import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr.ts';
import { Observable }     from 'rxjs/Observable';


import { ValidationService, AuthService, ProgressBarService } from '../../shared';
import { MeetUpService } from '../meetup.service';
import { Meetup } from '../meetup.service';

import { DialogService } from '../../shared';

@Component({
  templateUrl: './meetup-form.component.html',
  styleUrls: ['./meetup-form.component.scss'],
  directives: []
})
export class MeetUpFormComponent implements OnInit {
  meetup: Meetup;
  eventTypes: Array<String>;
  submit: Function;
  meetupForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ms: MeetUpService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastsManager,
    private ps: ProgressBarService,
    private dialogService: DialogService) {
  }
  get errorMessages(): Object{
    let _errorMessage = {};
    for (let key in this.meetupForm.controls) {
      if (this.meetupForm.controls.hasOwnProperty(key)) {
        let control = this.meetupForm.controls[key];
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
    if (/add/.test(this.route.toString())) {
      this.meetup = new Meetup();
      this.meetup.startTime = new Date();
      this.meetup.endTime = new Date();
      this.submit = this.newSubmit;
      this.meetup.uid = this.auth.user.uid;
    }else {
      this.route.data.forEach((data: {meetup: Meetup}) => {
      this.meetup = data.meetup;
    });
      this.submit = this.editSubmit;
    }
    this.meetupForm = this.formBuilder.group({
      name: [this.meetup.name, [Validators.required]],
      type: [this.meetup.type, Validators.required],
      host: [this.meetup.host, Validators.required],
      startTime: [this.meetup.startTime, Validators.required],
      endTime: [this.meetup.endTime, Validators.required],
      guestList: [this.meetup.guestList, Validators.required],
      location: [this.meetup.location, Validators.required],
      description: [this.meetup.description, Validators.required]
    });


    this.eventTypes = [
      'Birthday Party',
      'Conference Talk',
      'Wedding',
      'Others'
    ];
  }

  getMeetupEWWntity() {
    let controls = this.meetupForm.controls;
    for (let key in this.meetup) {
      if ( controls[key] && controls[key].value) {
        this.meetup[key] = controls[key].value;
      }
    }
  }

  newSubmit() {
    console.log('test submit');
    this.getMeetupEWWntity();
    this.ps.loadding();
    this.ms.addMeetUp(this.meetup).then(() => {
      this.ps.componentLoading();
      this.toastr.success('successfully added', 'success');
      this.router.navigate(['/meetup/list']);
    }, () => {
      this.ps.componentLoading();
      this.toastr.error('fail to submit', 'fail');
    }).catch(() => {
      this.ps.componentLoading();
      this.toastr.error('fail to submit', 'fail');
    });
  }

  editSubmit() {
    this.getMeetupEWWntity();
    this.ps.loadding();
    this.ms.upDateMeetUp(this.meetup).then(() => {
      this.ps.componentLoading();
      this.toastr.success('successfully updated', 'success');
      this.router.navigate(['/meetup/list']);
    },
    () => {
      this.ps.componentLoading();
      this.toastr.error('fail to submit', 'fail');
    }).catch(() => {
      this.ps.componentLoading();
      this.toastr.error('fail to submit', 'fail');
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.dialogService.confirm('Discard changes?');
  }

}


