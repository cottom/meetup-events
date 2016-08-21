import {
  Injectable
} from '@angular/core';

@Injectable()
export class ProgressBarService {
private _selector: string = 'loading-holder';
 private _element: HTMLElement;
  showflag: boolean = false;
  constructor() {
    this._element = document.getElementById(this._selector);
    this._element.style.display = 'none';
  }

  loadding() {
    this._element.style.display = 'block';
    this.showflag = true;
  }
  componentLoading() {
    this._element.style.display = 'none';
    this.showflag = false;
  }

}
