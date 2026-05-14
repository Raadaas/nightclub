import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientSettingsComponent } from './client-settings/client-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '',         component: ClientHomeComponent },
      { path: 'settings', component: ClientSettingsComponent },
      { path: '**',       redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
