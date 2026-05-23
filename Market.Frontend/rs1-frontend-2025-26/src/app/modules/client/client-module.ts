import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing-module';
import { SharedModule } from '../shared/shared-module';
import { SharedPagesModule } from '../shared-pages/shared-pages.module';

import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientSettingsComponent } from './client-settings/client-settings.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component';

@NgModule({
  declarations: [
    ClientLayoutComponent,
    ClientHomeComponent,
    ClientSettingsComponent,
    ClientReservationsComponent,
  ],
  imports: [
    SharedModule,
    SharedPagesModule,
    ClientRoutingModule,
  ],
})
export class ClientModule {}
