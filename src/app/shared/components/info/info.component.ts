import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() buttonText = '';
  @Output() buttonClick = new EventEmitter();

  constructor() {}
}
