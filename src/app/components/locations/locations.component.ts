import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOCATION_TYPE } from 'src/app/common/constant';
import {
  generateRandomlocation,
  loadLocations,
} from 'src/app/state/location/location.actions';
import { openForm } from 'src/app/state/ui/ui.action';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent {
  constructor(private store: Store) {
    this.store.dispatch(loadLocations());
  }

  openNewForm() {
    this.store.dispatch(openForm({ newFormType: LOCATION_TYPE }));
  }

  generateRandomLocation() {
    this.store.dispatch(generateRandomlocation());
  }
}
