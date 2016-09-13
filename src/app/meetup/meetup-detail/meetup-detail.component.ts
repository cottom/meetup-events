import { Component, OnInit} from '@angular/core';
import { MeetUpService, Meetup } from '../meetup.service';

import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

let detailImg = 'img/default-detail-bg.png';

@Component({
  templateUrl: './meetup-detail.component.html',
  styleUrls: ['./meetup-detail.component.scss']
})
export class MeetUpDetailComponent implements OnInit {
  meetup: Meetup;
  constructor(
    public ms: MeetUpService,
    private route: ActivatedRoute,
    private toastr: ToasterService,
    private router: Router) {}

  ngOnInit() {
    this.route.data.forEach((data: {meetup: Meetup}) => {
      this.meetup = data.meetup;
      console.log(this.meetup);
      if (!this.meetup.detailImage) {this.meetup.detailImage = detailImg; }
    });
  }

  delete() {
    if (window.confirm('if you really want to delete this meetup')) {
       this.ms.deleteMeetUp(this.meetup.$key).then(() => {
        this.toastr.pop( 'success', 'Success', 'successfully deleted');
          this.router.navigate(['/meetup/list']);
       }, () => {
         this.toastr.pop('error', 'fail', 'fail to delete');
       });
    }
  }

  edit() {
    this.router.navigate([`/meetup/edit/${this.meetup.$key}`]);
  }
}
