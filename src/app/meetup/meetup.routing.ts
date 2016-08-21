import { Routes, RouterModule }  from '@angular/router';

import { AuthGuard } from '../shared';

import { MeetUpComponent } from './meetup.component';
import { MeetUpDetailComponent } from './meetup-detail';
import { MeetUpListComponent} from './meetup-list';
import { MeetUpFormComponent } from './meetup-form';
import { MeetupDetailResolve, MeetupListResolve } from './meetup.resolve.service';
import { CanDeactivateGuard } from '../shared';
const meetupRoutes: Routes = [
  {
    path: 'meetup',
    component: MeetUpComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
         component: MeetUpListComponent,
         resolve: {
           meetups: MeetupListResolve
         }
      },
      {
        path: 'add',
        component: MeetUpFormComponent
      },
      {
        path: ':id',
        component: MeetUpDetailComponent,
        resolve: {
          meetup: MeetupDetailResolve
        }
      }, {
        path: 'edit/:id',
        component: MeetUpFormComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          meetup: MeetupDetailResolve
        }
      },

      {
        path: '',
        redirectTo: 'list'
      }
    ]
  }
];

export const routing = RouterModule.forChild(meetupRoutes);
