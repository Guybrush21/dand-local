import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { StyleClassModule } from 'primeng/styleclass';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';

import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';

import { MenuService } from './service/app.menu.service';
import { ConfigService } from './service/app.config.service';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CharactersComponent } from './components/characters/characters.component';
import { ItemsComponent } from './components/items/items.component';
import { LocationsComponent } from './components/locations/locations.component';
import { charactersReducer } from './state/character/character.reducer';
import { CharactersListComponent } from './components/characters/characters-list/characters-list.component';
import { DataViewModule } from 'primeng/dataview';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CharacterFormComponent } from './components/characters/character-form/character-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { charactersUIReducer } from './state/character/ui/character.ui.reducer';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { CharacterItemListComponent } from './components/characters/characters-list/character-item/character-item-list.component';
import { HydrationEffects } from './state/hydration/hydration.effects';
import { hydrationMetaReducer } from './state/hydration/hydration.reducer';
import { CharacterDropdownComponent } from './components/characters/character-form/character-dropdown/character-dropdown.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ButtonModule,
    AppRoutingModule,
    InputTextModule,
    HttpClientModule,
    SidebarModule,
    AvatarModule,
    ConfirmPopupModule,
    BrowserAnimationsModule,
    DataViewModule,
    ReactiveFormsModule,
    StyleClassModule,
    InputTextareaModule,
    AutoCompleteModule,
    StoreModule.forRoot(
      {
        characters: charactersReducer,
        characterUI: charactersUIReducer,
      },
      { metaReducers }
    ),
    EffectsModule.forRoot([HydrationEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  declarations: [
    AppComponent,
    AppMainComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    CharactersComponent,
    ItemsComponent,
    LocationsComponent,
    CharactersListComponent,
    CharacterFormComponent,
    CharacterItemListComponent,
    CharacterDropdownComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MenuService,
    ConfigService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
