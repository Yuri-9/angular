import { Component, OnInit } from '@angular/core';

export interface User {
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public buttonText = 'Logout';
  public user: User;
  constructor() {
    this.user = {
      name: 'Vasia',
    };
  }

  handleLogout(): void {
    console.log('logout');
  }

  ngOnInit(): void {
    console.log('HeaderComponent');
  }
}
