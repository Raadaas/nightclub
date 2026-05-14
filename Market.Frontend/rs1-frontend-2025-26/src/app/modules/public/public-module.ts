import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing-module';
import { SharedModule } from '../shared/shared-module';

import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { HomeComponent } from './home/home.component';
import { PubEventsComponent } from './pub-events/pub-events.component';
import { PubGalleryComponent } from './pub-gallery/pub-gallery.component';
import { PricingComponent } from './pricing/pricing.component';
import { AboutComponent } from './about/about.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    HomeComponent,
    PubEventsComponent,
    PubGalleryComponent,
    PricingComponent,
    AboutComponent,
    EventDetailComponent,
  ],
  imports: [
    SharedModule,
    PublicRoutingModule,
  ],
})
export class PublicModule {}
