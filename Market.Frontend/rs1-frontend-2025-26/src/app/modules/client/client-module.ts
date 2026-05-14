import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing-module';
import { SharedModule } from '../shared/shared-module';

import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientSettingsComponent } from './client-settings/client-settings.component';

@NgModule({
  declarations: [
    ClientLayoutComponent,
    ClientHomeComponent,
    ClientSettingsComponent,
  ],
  imports: [
    SharedModule,
    ClientRoutingModule,
  ],
})
export class ClientModule {}
