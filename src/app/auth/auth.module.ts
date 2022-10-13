import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { SessionStorageService } from './services/session-storage.service';
import { AuthorizedGuard } from './guards/authorized.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, SessionStorageService, AuthorizedGuard],
})
export class AuthModule {}
