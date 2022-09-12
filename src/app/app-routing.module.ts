import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { CharactersComponent } from './components/characters/characters.component';
import { ItemsComponent } from './components/items/items.component';
import { LocationsComponent } from './components/locations/locations.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogComponent } from './components/log/log.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { SessionFormComponent } from './components/sessions/session-form/session-form.component';
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppMainComponent,
          children: [
            {
              path: '',
              component: DashboardComponent,
            },
            {
              path: 'dashboard',
              component: DashboardComponent,
            },
            {
              path: 'characters',
              component: CharactersComponent,
            },
            {
              path: 'items',
              component: ItemsComponent,
            },
            {
              path: 'locations',
              component: LocationsComponent,
            },
            {
              path: 'logs',
              component: LogComponent,
            },
            {
              path: 'sessions',
              component: SessionsComponent,
            },
            {
              path: 'session',
              component: SessionFormComponent,
            },
          ],
        },
        { path: '**', redirectTo: 'pages/notfound' },
      ],
      { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
