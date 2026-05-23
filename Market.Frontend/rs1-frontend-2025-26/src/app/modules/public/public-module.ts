import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing-module';
import { SharedModule } from '../shared/shared-module';
import { SharedPagesModule } from '../shared-pages/shared-pages.module';

import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    SharedPagesModule,
    PublicRoutingModule,
  ],
})
export class PublicModule {}
