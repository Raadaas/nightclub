import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientSettingsComponent } from './client-settings/client-settings.component';
import { PubEventsComponent } from '../public/pub-events/pub-events.component';
import { PubGalleryComponent } from '../public/pub-gallery/pub-gallery.component';
import { PricingComponent } from '../public/pricing/pricing.component';
import { AboutComponent } from '../public/about/about.component';
import { EventDetailComponent } from '../public/event-detail/event-detail.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '',              component: ClientHomeComponent },
      { path: 'settings',      component: ClientSettingsComponent },
      { path: 'reservations',  component: ClientReservationsComponent },
      { path: 'events',        component: PubEventsComponent },
      { path: 'events/:id',    component: EventDetailComponent },
      { path: 'gallery',       component: PubGalleryComponent },
      { path: 'pricing',       component: PricingComponent },
      { path: 'about',         component: AboutComponent },
      { path: '**',            redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
