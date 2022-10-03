import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor() {}
  @Input() placeholder = '';
  @Output() searchEvent = new EventEmitter<string>();

  searchControl = new FormControl('');

  search() {
    console.log('this.searchControl.value', this.searchControl.value);
    const searchString = this.searchControl.value
      ? this.searchControl.value
      : '';

    this.searchEvent.emit(searchString);
  }
}
