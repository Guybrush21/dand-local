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
import { uiReducer } from './state/ui/ui.reducer';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { CharacterItemListComponent } from './components/characters/characters-list/character-item/character-item-list.component';
import { HydrationEffects } from './state/hydration/hydration.effects';
import { hydrationMetaReducer } from './state/hydration/hydration.reducer';
import { CharacterDropdownComponent } from './components/characters/character-form/character-dropdown/character-dropdown.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ItemsListComponent } from './components/items/items-list/items-list.component';
import { ItemsFormComponent } from './components/items/items-form/items-form.component';
import { ItemListElementComponent } from './components/items/items-list/item-lits-element/item-list-element.component';
import { itemsReducer } from './state/items/item.reducer';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CharacterEffects } from './state/character/character.effects';
import { ItemsEffects } from './state/items/item.effects';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MultiSidebarComponent } from './components/common/multi-sidebar/multi-sidebar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './components/login/login.component';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
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
    CheckboxModule,
    ToggleButtonModule,
    InputSwitchModule,
    StoreModule.forRoot(
      {
        characters: charactersReducer,
        characterUI: uiReducer,
        items: itemsReducer,
        ui: uiReducer,
      }
      //{ metaReducers }
    ),
    EffectsModule.forRoot([
      //HydrationEffects,
      CharacterEffects,
      ItemsEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
    DashboardComponent,
    LocationsComponent,
    CharactersListComponent,
    CharacterFormComponent,
    CharacterItemListComponent,
    CharacterDropdownComponent,
    ItemsListComponent,
    ItemsFormComponent,
    ItemListElementComponent,
    MultiSidebarComponent,
    LoginComponent,
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
