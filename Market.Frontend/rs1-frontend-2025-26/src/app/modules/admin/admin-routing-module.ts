import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { ClubTablesComponent } from './nightclub/club-tables/club-tables.component';
import { ClubTablesEditComponent } from './nightclub/club-tables/club-tables-edit/club-tables-edit.component';
import { EventsComponent } from './nightclub/events/events.component';
import { EventsEditComponent } from './nightclub/events/events-edit/events-edit.component';
import { ReservationsComponent } from './nightclub/reservations/reservations.component';
import { GalleryComponent } from './nightclub/gallery/gallery.component';
import { GalleryEventComponent } from './nightclub/gallery/gallery-event/gallery-event.component';
import { MenuCategoriesComponent } from './catalog/menu-categories/menu-categories.component';
import { MenuCategoryEditComponent } from './catalog/menu-categories/menu-category-edit/menu-category-edit.component';
import { MenuItemsComponent } from './catalog/menu-items/menu-items.component';
import { MenuItemsAddComponent } from './catalog/menu-items/menu-items-add/menu-items-add.component';
import { MenuItemsEditComponent } from './catalog/menu-items/menu-items-edit/menu-items-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      // MENU CATEGORIES
      {
        path: 'menu-categories',
        component: MenuCategoriesComponent,
      },
      {
        path: 'menu-categories/add',
        component: MenuCategoryEditComponent,
      },
      {
        path: 'menu-categories/:id/edit',
        component: MenuCategoryEditComponent,
      },

      // MENU ITEMS
      {
        path: 'menu-items',
        component: MenuItemsComponent,
      },
      {
        path: 'menu-items/add',
        component: MenuItemsAddComponent,
      },
      {
        path: 'menu-items/:id/edit',
        component: MenuItemsEditComponent,
      },

      {
        path: 'settings',
        component: AdminSettingsComponent,
      },

      // CLUB TABLES
      {
        path: 'club-tables',
        component: ClubTablesComponent,
      },
      {
        path: 'club-tables/add',
        component: ClubTablesEditComponent,
      },
      {
        path: 'club-tables/:id/edit',
        component: ClubTablesEditComponent,
      },

      // EVENTS
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'events/add',
        component: EventsEditComponent,
      },
      {
        path: 'events/:id/edit',
        component: EventsEditComponent,
      },

      // RESERVATIONS
      {
        path: 'reservations',
        component: ReservationsComponent,
      },

      // GALLERY
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'gallery/event/:id',
        component: GalleryEventComponent,
      },

      // default admin route → /admin/menu-items
      {
        path: '',
        redirectTo: 'menu-items',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
