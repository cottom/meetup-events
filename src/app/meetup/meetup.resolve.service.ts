import { Injectable} from '@angular/core';
import { Router,  Resolve,  ActivatedRouteSnapshot} from '@angular/router';
import {  Observable } from 'rxjs/Observable';

import {Meetup, MeetUpService} from './meetup.service';
import { ProgressBarService, AuthService } from '../shared';

@Injectable()
export class MeetupDetailResolve implements Resolve < Meetup > {
  constructor(
    private ms: MeetUpService,
    private router: Router,
    private progressBarService: ProgressBarService,
    private authService: AuthService) {}

  resolve(router: ActivatedRouteSnapshot): Observable <any> | Promise <any> | any {
    this.progressBarService.loadding();
    let key = router.params['id'];
    return this.ms.getMeetUpDetail(key).then((snapshot) => {
        this.progressBarService.componentLoading();
        let meetup = snapshot.val();
       if (!meetup || meetup.$value === null) {
         this.router.navigate(['/meetup/list']);
        }else {
          if (String(meetup.uid) === String(this.authService.user.uid)) {
            meetup.right = true;
          }
        }
       return meetup;
    });
  }
}





@Injectable()
export class MeetupListResolve implements Resolve <Array<Meetup >> {
  constructor(
    private ms: MeetUpService,
    private router: Router,
    private progressBarService: ProgressBarService,
    private authService: AuthService) {}
  resolve(route: ActivatedRouteSnapshot): Observable <any> | Promise <any> | any {
    this.progressBarService.loadding();
     return this.ms.getMeetUpList().then((snapshot) => {
         let _meetups = snapshot.val();
         let meetups = [];
         this.progressBarService.componentLoading();
         for (let key in _meetups) {
           if (_meetups.hasOwnProperty(key)) {
              _meetups[key].$key = key;
              meetups.push(_meetups[key]);
           }
         }
         meetups.forEach((item) => {
           if (String(item.uid) === String(this.authService.user.uid)) {
             item.right = true;
           }
         });
         return meetups;
     });
  }
}
