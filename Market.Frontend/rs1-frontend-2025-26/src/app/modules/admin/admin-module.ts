import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing-module';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {AdminSettingsComponent} from './admin-settings/admin-settings.component';
import {SharedModule} from '../shared/shared-module';
import { ClubTablesComponent } from './nightclub/club-tables/club-tables.component';
import { ClubTablesEditComponent } from './nightclub/club-tables/club-tables-edit/club-tables-edit.component';
import { EventsComponent } from './nightclub/events/events.component';
import { EventsEditComponent } from './nightclub/events/events-edit/events-edit.component';
import { ReservationsComponent } from './nightclub/reservations/reservations.component';
import { GalleryComponent } from './nightclub/gallery/gallery.component';
import { GalleryEventComponent } from './nightclub/gallery/gallery-event/gallery-event.component';
import { GalleryImageUpsertComponent } from './nightclub/gallery/gallery-image-upsert/gallery-image-upsert.component';
import { MenuCategoriesComponent } from './catalog/menu-categories/menu-categories.component';
import { MenuCategoryEditComponent } from './catalog/menu-categories/menu-category-edit/menu-category-edit.component';
import { MenuItemsComponent } from './catalog/menu-items/menu-items.component';
import { MenuItemsAddComponent } from './catalog/menu-items/menu-items-add/menu-items-add.component';
import { MenuItemsEditComponent } from './catalog/menu-items/menu-items-edit/menu-items-edit.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminSettingsComponent,
    ClubTablesComponent,
    ClubTablesEditComponent,
    EventsComponent,
    EventsEditComponent,
    ReservationsComponent,
    GalleryComponent,
    GalleryEventComponent,
    GalleryImageUpsertComponent,
    MenuCategoriesComponent,
    MenuCategoryEditComponent,
    MenuItemsComponent,
    MenuItemsAddComponent,
    MenuItemsEditComponent,
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
