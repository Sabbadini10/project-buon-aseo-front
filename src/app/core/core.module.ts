import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { throwIfAlreadyLoaded } from './guards/module-imports.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthGuard, AuthService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
