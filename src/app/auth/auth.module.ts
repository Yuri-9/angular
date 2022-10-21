import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { SessionStorageService } from './services/session-storage.service';
import { AuthorizedGuard } from './guards/authorized.guard';
import { UserModule } from '../user/user.module';
import { AuthStateFacade } from './store/auth.facade';

@NgModule({
  declarations: [],
  imports: [CommonModule, UserModule],
  providers: [AuthService, SessionStorageService, AuthorizedGuard, AuthStateFacade],
})
export class AuthModule {}
