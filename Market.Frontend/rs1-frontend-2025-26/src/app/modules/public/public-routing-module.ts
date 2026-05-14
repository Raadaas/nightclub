import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { HomeComponent } from './home/home.component';
import { PubEventsComponent } from './pub-events/pub-events.component';
import { PubGalleryComponent } from './pub-gallery/pub-gallery.component';
import { PricingComponent } from './pricing/pricing.component';
import { AboutComponent } from './about/about.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'events',        component: PubEventsComponent },
      { path: 'events/:id',   component: EventDetailComponent },
      { path: 'gallery', component: PubGalleryComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'about',   component: AboutComponent },
      { path: '**',      redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
