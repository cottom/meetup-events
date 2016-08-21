import {
  Injectable
} from '@angular/core';

@Injectable()
export class ProgressBarService {
  showflag: boolean = false;
  loadding() {
    this.showflag = true;
  }
  componentLoading() {
    this.showflag = false;
  }

}
