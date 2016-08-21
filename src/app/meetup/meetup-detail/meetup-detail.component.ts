import { Component, OnInit} from '@angular/core';
import { MeetUpService, Meetup } from '../meetup.service';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr.ts';

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
    private toastr: ToastsManager,
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
        this.toastr.success('successfully deleted', 'Success');
          this.router.navigate(['/meetup/list']);
       }, () => {
         this.toastr.error('fail to delete', 'fail');
       });
    }
  }

  edit() {
    this.router.navigate([`/meetup/edit/${this.meetup.$key}`]);
  }
}
