
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {routing } from './app.routing';
import { SignModule } from './sign';
import { MeetUpModule } from './meetup';



import { SharedModule } from './shared/shared-module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    routing,
    HttpModule,
    SignModule,
    MeetUpModule,
    ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
