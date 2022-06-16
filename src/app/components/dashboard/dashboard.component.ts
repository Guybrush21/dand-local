import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCharacters } from 'src/app/state/character/character.action';
import { loadItems } from 'src/app/state/items/item.actions';
import { loadLocations } from 'src/app/state/location/location.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private store: Store) {
    this.store.dispatch(loadLocations());
    this.store.dispatch(loadItems());
    this.store.dispatch(loadCharacters());
  }
}
