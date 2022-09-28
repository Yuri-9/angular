import { Component, Input } from '@angular/core';

interface IInfo {
  title: string;
  message: string;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  @Input() option: IInfo = {
    title: '',
    message: '',
  };
  @Input() isShowMessage = true;

  constructor() {}
}
