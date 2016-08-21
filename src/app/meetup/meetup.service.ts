export class Meetup {
    public $key: string;
    public id: number;
    public uid: any;
   constructor(
    public name?: string,
    public type?: string,
    public host?: string,
    public startTime?: Date,
    public endTime?: Date,
    public guestList?: Array < string >,
    public description?: string,
    public imageUrl?: String,
    public detailImage?: string,
    public right?: boolean,
    public location?: string) {

    }
}




import {  Injectable } from '@angular/core';



import { AuthService} from '../shared';
@Injectable()
export class MeetUpService {

  database: firebase.database.Database = firebase.database();
  constructor( private authService: AuthService) {}

  getMeetUpList(params ?: Object): firebase.Promise<any> {
     return  firebase.database().ref('/meetup').once('value');
  }

  /**
   * CURD
   */

  getMeetUpDetail(id: any): Promise <any> {
      return firebase.database().ref(`/meetup/${id}`).once('value');
  }

  upDateMeetUp(meetup: Meetup): Promise < any > {
    let update = {};
    update[`meetup/${meetup.$key}`] = meetup;
    delete meetup.$key;
    return firebase.database().ref().update(update);
  }

  deleteMeetUp(id: any): Promise < any >  {
    return firebase.database().ref(`/meetup/${id}`).set(null);
  }

  addMeetUp(meetup: Meetup): Promise < any >  {
    return firebase.database().ref().child('meetup').push(JSON.parse(JSON.stringify(meetup)));
  }


}
