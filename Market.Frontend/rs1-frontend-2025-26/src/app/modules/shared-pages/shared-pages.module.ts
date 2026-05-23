import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared-module';
import { PubEventsComponent } from '../public/pub-events/pub-events.component';
import { PubGalleryComponent } from '../public/pub-gallery/pub-gallery.component';
import { PricingComponent } from '../public/pricing/pricing.component';
import { AboutComponent } from '../public/about/about.component';
import { EventDetailComponent } from '../public/event-detail/event-detail.component';

@NgModule({
  declarations: [
    PubEventsComponent,
    PubGalleryComponent,
    PricingComponent,
    AboutComponent,
    EventDetailComponent,
  ],
  imports: [SharedModule],
  exports: [
    PubEventsComponent,
    PubGalleryComponent,
    PricingComponent,
    AboutComponent,
    EventDetailComponent,
  ],
})
export class SharedPagesModule {}
