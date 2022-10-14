import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { faXmark } from '@fortawesome/free-solid-svg-icons';

export interface IModal {
  title: string;
  message: string;
  okButtonText?: string;
  cancelButtonText?: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  iconClose = faXmark;
  shouldHide = false;

  @Input() option: IModal = {
    title: '',
    message: '',
    okButtonText: '',
    cancelButtonText: '',
  };
  @Input() open = false;

  @Output() okClickEvent = new EventEmitter();
  @Output() closeModalEvent = new EventEmitter();

  constructor() {}

  okClick() {
    this.okClickEvent.emit();
  }

  closeModal() {
    this.shouldHide = true;
    setTimeout(() => {
      this.closeModalEvent.emit();
      this.shouldHide = false;
    }, 255);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
