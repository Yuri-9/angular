import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { SessionStorageService } from './services/session-storage.service';
import { AuthorizedGuard } from './guards/authorized.guard';
import { UserModule } from '../user/user/user.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UserModule],
  providers: [AuthService, SessionStorageService, AuthorizedGuard],
})
export class AuthModule {}
