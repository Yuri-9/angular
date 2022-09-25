import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faPencil,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export enum BUTTON_ICON {
  PENCIL = 'pencil',
  BASKET = 'basket',
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text = '';
  @Output() buttonClick = new EventEmitter();
  @Input() iconType?: IconDefinition;
  public hasPadding = false;

  constructor() {}
}
