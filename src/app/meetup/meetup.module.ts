import { NgModule } from '@angular/core';
import { SharedModule} from '../shared';

import { MaterialModule } from '../shared/angular2-material';
import { MeetUpComponent } from './meetup.component';
import { MeetUpDetailComponent } from './meetup-detail';
import { MeetUpListComponent } from './meetup-list';
import { NavComponent } from '../shared/nav';
import { MeetUpFormComponent} from './meetup-form';

import { MeetUpService } from './meetup.service';
import { MeetupDetailResolve, MeetupListResolve } from './meetup.resolve.service';

import {routing} from './meetup.routing';

@NgModule({
  imports: [
    routing,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    NavComponent,
    MeetUpDetailComponent,
    MeetUpListComponent,
    MeetUpComponent,
    MeetUpFormComponent
  ],
  providers: [
    MeetUpService,
    MeetupListResolve,
    MeetupDetailResolve
  ]
})
export class MeetUpModule {

}
