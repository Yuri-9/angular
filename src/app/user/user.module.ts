import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { UserStateFacade } from './store/user.facade';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [UserService, UserStateFacade],
})
export class UserModule {}
