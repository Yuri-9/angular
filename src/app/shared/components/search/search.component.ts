import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchValue = '';

  @Input() placeholder = '';
  @Output() searchEvent = new EventEmitter<string>();

  search(): void {
    this.searchEvent.emit(this.searchValue);
  }
}
