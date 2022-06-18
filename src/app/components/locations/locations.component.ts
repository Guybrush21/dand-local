import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOCATION_TYPE } from 'src/app/common/constant';
import LocationGenerator from 'src/app/generators/locationGenerator';
import {
  generateRandomlocation,
  loadLocations,
  SaveLocation,
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
    const generator = new LocationGenerator();
    const location = generator.next();
    this.store.dispatch(SaveLocation({ location }));
  }
}
