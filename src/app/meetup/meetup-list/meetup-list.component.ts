import { Component,  OnInit } from '@angular/core';
import {  MeetUpService} from '../meetup.service';
import {  Router,  ActivatedRoute} from '@angular/router';
import { ToasterService} from 'angular2-toaster/angular2-toaster';
import { Meetup } from '../meetup.service';

import { AuthService} from '../../shared';

let defaultImgUrl = 'img/default-meetup-img.png';

@Component({
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss'],
})
export class MeetUpListComponent implements OnInit {
  meetups: Meetup[];
  constructor(
    public authService: AuthService,
    public meetupService: MeetUpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService) {}

  ngOnInit() {
    this.route.data.forEach((data: {
      meetups: Meetup[]
    }) => {
      this.meetups = data.meetups;
      console.log(this.meetups);
      this.meetups.reverse();
      this.meetups.forEach(item => {
        if (!item.imageUrl) {
          item.imageUrl = defaultImgUrl;
        }
      });
    });
  }

  getMeetups() {

  }

  detail(id: any) {
    this.router.navigate([`/meetup/${id}`]);
  }
  delete(id) {
    if ( window.confirm('Do you really want to delete it?')) {
      this.meetupService.deleteMeetUp(id).then(() => {
        this.toastr.pop('success', 'Success', 'successfully deleted');
        this.router.navigate(['meetup']);
      });
    }
  }
  edit(id) {
    this.router.navigate([`/meetup/edit/${id}`]);
  }
  add() {
    this.router.navigate(['/meetup/add']);
  }

};
